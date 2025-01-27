import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '@shared/data-access/base-http.service';
import { SnackBarService } from '@shared/ui/snack-bar.service';
import { catchError, Observable, throwError } from 'rxjs';

interface clientData {
    nombre: string;
    apellido: string;
    email: string;
    orderRef: string;
}

interface response {
    status: boolean;
    message: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService extends BaseHttpService {
    _snackbar = inject(SnackBarService);

    sendMail(clientData: clientData): Observable<response> {
      const message = this.getEmailHtml(clientData);
      const email = clientData.email
      const subject = `Pedido recibido ${clientData.orderRef}`;

      const payload = { email,subject, message }
      
      return this.http.post<response>(this.apiUrl + 'mails/emailEndpoint.php', payload).pipe(
        catchError(error => {
          return throwError(() => console.log(error));
        })
      );
    }

    getEmailHtml(clientData: clientData) {
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
                    <p style="margin: 0;">Hola ${clientData.nombre} ${clientData.apellido},</p>
                </td>
                </tr>
                <tr>
                <td style="padding-bottom: 16px;">
                    <p style="margin: 0;">Tu pedido con la referencia ${clientData.orderRef} ha sido recibido y se encuentra en preparación</p>
                </td>
                </tr>
                <tr>
                <td style="padding-bottom: 16px;">
                    <a href="https://camarasdeseguridadfacil.cl/pedidos/confirmed/${clientData.orderRef}"
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
            <footer style="text-align: center; margin-top: 16px;">
                <a href="https://camarasdeseguridadfacil.cl"
                style="text-decoration: none; color: #f3f4f6; background-color: #1f2937; padding: 8px 16px; border-radius: 8px; display: inline-block;">
                Ver más Productos
                </a>
            </footer>
        </article>
        `;
    }
}