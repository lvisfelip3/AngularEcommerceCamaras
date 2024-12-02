import { ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginComponent, RegisterComponent } from '../'

@Component({
  selector: 'app-auth-dialog',
  standalone: true,
  imports: [
    MatTabsModule,
    LoginComponent,
    RegisterComponent
  ],
  templateUrl: './auth-dialog.component.html',
  styleUrl: './auth-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<number>,
    @Inject(MAT_DIALOG_DATA) public data: number,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
