import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
  <h1 mat-dialog-title class="!text-gray-100 !text-3xl">
    <mat-icon>info</mat-icon>
    Aviso
  </h1>
  <mat-dialog-content class="mat-typography">
    <p class="text-gray-100 text-pretty">Un correo de notificaci&oacute;n ser&aacute; enviado a {{ this.data.nombre }} al correo {{ this.data.email }} con el cambio de estado a {{this.data.status}}</p>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close cdkFocusInitial>Cancelar</button>
    <button mat-button [mat-dialog-close]="true">Continuar</button>
  </mat-dialog-actions>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent {
  
  data= inject(MAT_DIALOG_DATA);
  
}
