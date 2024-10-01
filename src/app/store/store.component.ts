  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
  import { FormsModule } from "@angular/forms";
  import { NgFor, NgIf } from '@angular/common';
  import { ProductService } from "../services/product.service";
  import { Product } from "../models/product"
  import { CreditCard } from "../models/creditCard";
  import {ClientService} from "../services/client.service";
  import {Discount} from "../models/discount";
  import {ProductDiscount} from "../models/productDiscount";
  import {BuyDiscount} from "../models/buyDiscount";
  import {DiscountService} from "../services/discount.service";
  import {SaleService} from "../services/sale.service";

  @Component({
  selector: 'app-store',
  standalone: true,
    imports: [FormsModule, NgFor, NgIf],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {

    clientId: number | null = null;
    products: Product[] = [];
    selectedProducts: Product[] = [];
    discounts: Discount[] = [];
    clientCards: CreditCard[] = [];
    selectedCard: CreditCard | undefined;
    totalPrice: number | undefined;
    msjError: string = '';

    constructor(private route: ActivatedRoute,
                private productoService: ProductService,
                private clientService: ClientService,
                private discountService: DiscountService,
                private saleService: SaleService){ }

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const clientIdParam = params.get('clientId');
        if (clientIdParam !== null) {
          this.clientId = Number(clientIdParam);
          this.cargarTarjetasCliente(this.clientId);
        } else {
          alert('ID de cliente no válido.');
        }
      });

      this.productoService.getProductos().subscribe(data => {
        this.products = data;
      });

      this.discountService.getDiscounts().subscribe(data =>{
        this.discounts = data;
      });
    }

    cargarTarjetasCliente(clientId: number): void {

      this.clientService.getCards(clientId).subscribe(data => {
        this.clientCards = data;
      })
    }

    calcularTotal(): void {
      // Implementar lógica para calcular el total
      if (this.selectedCard === undefined) {
        this.msjError = 'Primero debe seleccionar una tarjeta.';
        return;
      }
      this.saleService.getTotalPrice(this.selectedCard?.id, this.selectedProducts).subscribe( data => {
        this.totalPrice = data;
      })
    }

    onCheckboxChange(event: any, producto: any) {
      if (event.target.checked) {
        // Agrega el producto a la lista si está seleccionado
        this.selectedProducts.push(producto);
      } else {
        // Elimina el producto de la lista si se deselecciona
        this.selectedProducts = this.selectedProducts.filter(p => p !== producto);
      }
    }

    realizarCompra(): void {

      if (this.selectedProducts.length === 0) {
        this.msjError = 'Debe seleccionar al menos un producto.';
        return;
      }

      this.saleService.completePurchase(this.clientId, this.selectedCard?.id, this.selectedProducts)
    }

    isProductDiscount(discount: Discount): discount is ProductDiscount {
      return (discount as ProductDiscount).brand !== undefined;
    }

    isBuyDiscount(discount: Discount): discount is BuyDiscount {
      return (discount as BuyDiscount).cardType !== undefined;
    }

  }
