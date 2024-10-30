import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {FormsModule, NgModel} from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import {Product, ProductUpdate} from "../models/product";
import {Category} from "../models/category";
import {NgFor, NgIf} from "@angular/common";
import {Brand} from "../models/brand";
import {BrandsService} from "../services/brands.service";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf ],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {

  @Input() product: Product | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<ProductUpdate>();

  categories: Category[] = [];
  brands: Brand[] = [];

  constructor(private categoriesService: CategoriesService, private brandsService: BrandsService) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

    this.brandsService.getbrands().subscribe((brands) => {
      this.brands = brands;
    });
  }

  private createProductUpdate(): ProductUpdate {
    return {
      id: this.product!.id,
      code: this.product!.code,
      description: this.product!.description,
      idCategory: this.product!.category.id,
      idBrand: this.product!.brand.id,
      price: this.product!.price,
      version: this.product!.version
    };
  }

  onClose(): void {
    this.closeModal.emit();
  }

  onSave(): void {
    if (this.product) {
      const updatedProduct = this.createProductUpdate();
      this.saveChanges.emit(updatedProduct);
      this.onClose();
    }
  }

}
