import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CategoriasService } from '@admin/maintainers/category/category.service';
import { Category } from '@shared/interfaces/interfaces';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FilterSkeletonComponent } from '../skeleton/filter-skeleton/filter-skeleton.component';

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
    AsyncPipe,
    FilterSkeletonComponent
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {
  @Input() formControl: FormControl = new FormControl('');
  @Input() maxValue = 0;

  @Output() categoryChange = new EventEmitter<number | null>();
  @Output() maxPriceChange = new EventEmitter<number>();
  @Output() orderByChange = new EventEmitter<string | null>();

  categoryControl = new FormControl('');
  maxPriceControl = new FormControl(0);
  orderByControl = new FormControl('');
  categories: Category[] = [];
  isFiltered = false;

  categories$: Observable<Category[]>

  constructor(private crudService: CategoriasService, private cdr: ChangeDetectorRef) {

    this.categories$ = this.crudService.getCategories();
  }

  ngOnInit(): void {

    this.categoryControl.valueChanges.subscribe((selectedCategory) => {
      this.isFiltered =
        !!selectedCategory || this.formControl.value?.trim().length > 0;
      this.categoryChange.emit(selectedCategory as number | null);
    });

    this.orderByControl.valueChanges.subscribe((orderBy) => {
      this.orderByChange.emit(orderBy);
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

  resetFilter(): void {
    this.isFiltered = false;
    this.categoryControl.setValue(null, { emitEvent: false });
    this.formControl.setValue('', { emitEvent: false });
    this.maxPriceControl.setValue(this.maxValue, { emitEvent: false });

    this.maxPriceControl.setValue(this.maxValue);
    this.maxPriceChange.emit(this.maxValue);
  }
}
