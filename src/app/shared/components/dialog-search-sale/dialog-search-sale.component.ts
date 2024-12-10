import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-search-sale',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './dialog-search-sale.component.html',
  styleUrl: './dialog-search-sale.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogSearchSaleComponent {

  fb = inject(FormBuilder);
  router = inject(Router);

  constructor(public dialogRef: MatDialogRef<DialogSearchSaleComponent>) { }

  searchForm = this.fb.group({
    search: ['', [
      Validators.required,
      Validators.minLength(13),
      Validators.maxLength(13),
      Validators.pattern(/^[0-9a-f]{13}$/u)
    ]],
  });

  search() {
    if (this.searchForm.valid) {
      this.router.navigate([`/pedidos/confirmed/${this.searchForm.value.search}`])
        .then(
          () => this.dialogRef.close()
        );
    }
  }
}
