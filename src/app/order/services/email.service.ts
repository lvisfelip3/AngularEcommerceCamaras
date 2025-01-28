import { Injectable } from '@angular/core';
import { BaseHttpService } from '@shared/data-access/base-http.service';
import { catchError, Observable, throwError } from 'rxjs';

export interface clientData {
    nombre: string;
    apellido?: string;
    email: string;
    orderRef: string;
    action: Action;
    status?: string;
    type: Type;
}

export enum Action {
    CREATE,
    UPDATE,
}

export enum Type {
    PAYMENT,
    DELIVERY
}

export enum PaymentStatus {
    PENDING = 'Pendiente',
    COMPLETED = 'Completado',
    FAILED = 'Fallido'
}

export enum DeliveryStatus {
    PENDING = 'Pendiente',
    ASSIGNED = 'Asignado',
    COMPLETED = 'Realizado'
}

interface EmailResponse {
    status: boolean;
    message: string;
}

@Injectable({
    providedIn: 'root',
})
export class EmailService extends BaseHttpService {

    sendMail(clientData: clientData): Observable<EmailResponse> {
        const message = this.generateEmailContent(clientData);
        const email = clientData.email;
        const subject = this.generateEmailSubject(clientData);

        const payload = { email, subject, message };

        return this.http.post<EmailResponse>(this.apiUrl + 'mails/emailEndpoint.php', payload).pipe(
            catchError(error => {
                return throwError(() => error);
            })
        );
    }

    private generateEmailSubject(clientData: clientData): string {
        const { action, orderRef, type } = clientData;
        
        if (action === Action.CREATE) {
            return `Pedido recibido ${orderRef}`;
        }

        const subjectPrefix = type === Type.PAYMENT ? 'Actualizacion de pago' : 'Actualizacion de envío';
        return `${subjectPrefix} - Pedido ${orderRef}`;
    }

    private generateEmailContent(clientData: clientData): string {
        const { action } = clientData;
        return action === Action.CREATE 
            ? this.createOrderEmail(clientData) 
            : this.generateUpdateEmail(clientData);
    }

    private createOrderEmail(clientData: clientData): string {
        const { nombre, apellido, orderRef } = clientData;
        const fullName = apellido ? `${nombre} ${apellido}` : nombre;

        return this.getEmailTemplate({
            fullName,
            orderRef,
            mainMessage: 'Tu pedido ha sido recibido y se encuentra en preparación',
            showProductsLink: true
        });
    }

    private generateUpdateEmail(clientData: clientData): string {
        const { nombre, apellido, orderRef, status, type } = clientData;
        const fullName = apellido ? `${nombre} ${apellido}` : nombre;
        
        let statusMessage = '';
        if (type === Type.PAYMENT) {
            statusMessage = this.getPaymentStatusMessage(status as PaymentStatus);
        } else if (type === Type.DELIVERY) {
            statusMessage = this.getDeliveryStatusMessage(status as DeliveryStatus);
        }

        return this.getEmailTemplate({
            fullName,
            orderRef,
            mainMessage: statusMessage,
            showProductsLink: true
        });
    }

    private getPaymentStatusMessage(status: PaymentStatus): string {
        const messages = {
            [PaymentStatus.PENDING]: 'Tu pago está pendiente de confirmación',
            [PaymentStatus.COMPLETED]: 'Tu pago ha sido confirmado exitosamente',
            [PaymentStatus.FAILED]: 'Hubo un problema con tu pago, por favor contáctanos'
        };
        return messages[status] || 'Estado de pago actualizado';
    }

    private getDeliveryStatusMessage(status: DeliveryStatus): string {
        const messages = {
            [DeliveryStatus.PENDING]: 'Tu pedido está pendiente de envío',
            [DeliveryStatus.ASSIGNED]: 'Tu pedido ha sido asignado para entrega',
            [DeliveryStatus.COMPLETED]: 'Tu pedido ha sido entregado exitosamente'
        };
        return messages[status] || 'Estado de envío actualizado';
    }

    private getEmailTemplate(params: {
        fullName: string,
        orderRef: string,
        mainMessage: string,
        showProductsLink: boolean
    }): string {
        return `
        <article style="background-color: #f3f4f6; padding: 16px;">
            <table style="width: 100%; border-spacing: 0; border-collapse: collapse; text-align: center;">
                <tr>
                    <td style="padding-bottom: 16px;">
                        <img src="https://camarasdeseguridadfacil.cl/logo.png" alt="Logo" style="width: 40px; height: 32px; border-radius: 8px;">
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 1.25rem; font-weight: bold; padding-bottom: 16px;">
                        Cámaras de Seguridad Fácil
                    </td>
                </tr>
                <tr>
                    <td style="padding-bottom: 16px;">
                        <p style="margin: 0;">Hola ${params.fullName},</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding-bottom: 16px;">
                        <p style="margin: 0;">${params.mainMessage}</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding-bottom: 16px;">
                        <a href="https://camarasdeseguridadfacil.cl/pedidos/confirmed/${params.orderRef}"
                        style="background-color: #1f2937; color: #f3f4f6; text-decoration: none; padding: 8px 16px; border-radius: 8px; display: inline-block;">
                        Ver detalles del pedido
                        </a>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p style="margin: 0;">Gracias por tu compra</p>
                    </td>
                </tr>
            </table>
            ${params.showProductsLink ? `
            <footer style="text-align: center; margin-top: 16px; padding: 16px 0px;">
                <a href="https://camarasdeseguridadfacil.cl"
                style="text-decoration: none; color: #f3f4f6; background-color: #1f2937; padding: 8px 16px; border-radius: 8px; display: inline-block;">
                Ver más Productos
                </a>
            </footer>
            ` : ''}
        </article>
        `;
    }
}