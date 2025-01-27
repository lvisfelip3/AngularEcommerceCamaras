import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
  template: `
  <h1 mat-dialog-title>¿Desea continuar?</h1>
  <mat-dialog-content class="mat-typography">
    <p>Un correo de notificaci&oacute;n ser&aacute; enviado a {{ this.data.nombre }} con el cambio de estado a {{this.data.status}}</p>
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
