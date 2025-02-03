import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ContentChild, effect, input, OnInit, output, TemplateRef } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatPaginatorModule
  ],
  template: `
    <section class="w-full flex-col border rounded-lg border-gray-200 dark:border-gray-700 shadow-md dark:shadow-none">
      <header class="flex items-center justify-between p-4">
        <div>
          <button 
            mat-flat-button 
            (click)="openDialog()" 
            class="!rounded-lg !text-gray-100 dark:!text-gray-900 dark:!bg-slate-100 !bg-gray-900 !w-min !px-2"
            matTooltip="Añadir Item"
            >
            <mat-icon class="!m-0 !p-0">add</mat-icon>
          </button>
        </div>
        <div class="flex gap-2 items-center">
          <button mat-icon-button 
            (click)="reloadTable()"
            class="!flex !justify-center !items-center"
            matTooltip="Recargar Tabla"
          >
            <mat-icon class="!m-0 !p-0 !text-gray-600 dark:!text-gray-300">refresh</mat-icon>
          </button>
          <label class="flex items-center rounded-lg bg-gray-900 dark:bg-slate-200 text-slate-200 dark:text-gray-900 h-12">
            <mat-icon class="!m-0">search</mat-icon>
            <input 
              (keyup)="applyFilter($event)" 
              placeholder="Filtrar por..." 
              class="!bg-transparent px-2 border-0 outline-none">
          </label>
        </div>
      </header>
      <main class="pb-4">
        <table mat-table [dataSource]="dataSource"
        class="!bg-slate-100 dark:!bg-gray-900"
        >
        @for (col of columns(); track $index;) {
          <ng-container [matColumnDef]="col">
            <th mat-header-cell *matHeaderCellDef class="!text-gray-900 dark:!text-gray-100"> {{col.toUpperCase()}} </th>
            <td mat-cell *matCellDef="let element" class="!text-gray-900 dark:!text-gray-100"> {{element[col]}} </td>
          </ng-container>
        }

        <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef class="!text-gray-900 dark:!text-gray-100 !text-center"> OPCIONES </th>
            <td mat-cell *matCellDef="let element" class="!text-center">
              <ng-container *ngTemplateOutlet="actionsTemplate; context: { $implicit: element }"></ng-container>
            </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns()"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns();"></tr>
        </table>
      </main>
      <footer class="flex items-center justify-end p-4">
        <mat-paginator 
          [pageSizeOptions]="[5, 10, 15]" 
          showFirstLastButtons
          class="!bg-slate-100 dark:!bg-gray-900 !text-gray-900 dark:!text-gray-100"
          ></mat-paginator>
      </footer>
    </section>
  `,
  styleUrl: './data-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent<T> implements OnInit {

  data = input.required<T[]>()
  columns = input.required<string[]>();
  displayedColumns = computed(() => this.columns().concat('actions'));

  reloadEmitter = output<null>();
  openDialogEmitter = output<null>();

  filter = input<string>();
  filterControl = new FormControl('');

  dataSource = new MatTableDataSource<T>();

  @ContentChild('actionsTemplate', { static: true }) actionsTemplate!: TemplateRef<any>;

  constructor() {
    effect(() => {
      if (this.data() || !this.filter()) this.dataSource.data = this.data();
      if (this.filter()) this.dataSource.filter = this.filter()!.trim().toLowerCase();
    })
  }

  ngOnInit(): void {
    this.dataSource.data = this.data();
  }

  reloadTable(): void {
    this.reloadEmitter.emit(null);
  }

  openDialog(): void {
    this.openDialogEmitter.emit(null);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
