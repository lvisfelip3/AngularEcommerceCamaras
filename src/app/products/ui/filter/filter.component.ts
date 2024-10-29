import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CategoriasService } from '@admin/maintainers/category/category.service';
import { Category } from '@shared/interfaces/interfaces';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatSliderModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit {
  @Input() formControl: FormControl = new FormControl('');
  @Input() maxValue = 0;

  @Output() categoryChange = new EventEmitter<number | null>();
  @Output() maxPriceChange = new EventEmitter<number>();

  categoryControl = new FormControl('');
  maxPriceControl = new FormControl(0);
  categories: Category[] = [];
  isFiltered = false;

  constructor(private crudService: CategoriasService) {}

  ngOnInit(): void {
    this.getCategorias();

    this.categoryControl.valueChanges.subscribe((selectedCategory) => {
      this.isFiltered =
        !!selectedCategory || this.formControl.value?.trim().length > 0;
      this.categoryChange.emit(selectedCategory as number | null);
    });

    this.formControl.valueChanges.subscribe((searchValue) => {
      this.isFiltered =
        searchValue?.trim().length > 0 || !!this.categoryControl.value;
    });

    this.maxPriceControl.valueChanges.subscribe((price) => {
      if (price !== null) {
        this.isFiltered = true;
        this.maxPriceChange.emit(price);
      }
    });
  }

  getCategorias(): void {
    this.crudService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.error('Error al obtener categorías:', error);
      },
    });
  }

  resetFilter(): void {
    this.isFiltered = false;
    this.categoryControl.setValue(null, { emitEvent: false });
    this.formControl.setValue('', { emitEvent: false });
    this.maxPriceControl.setValue(this.maxValue, { emitEvent: false });

    this.maxPriceControl.setValue(this.maxValue);
    this.maxPriceChange.emit(this.maxValue);
  }
}
