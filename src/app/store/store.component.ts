  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
  import { FormsModule } from "@angular/forms";
  import {CurrencyPipe, NgFor, NgIf} from '@angular/common';
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
    imports: [FormsModule,
      NgFor,
      NgIf,
      CurrencyPipe],
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
    totalPrice: number | null = null;
    msjError: string = '';
    msjOk: string = '';

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

      console.log('Discounts:', this.discounts);
    }

    cargarTarjetasCliente(clientId: number): void {

      this.clientService.getCards(clientId).subscribe(data => {
        this.clientCards = data;
      })
    }

    onCheckboxChange(event: any, producto: any) {
      if (event.target.checked) {
        this.selectedProducts.push(producto);

      } else {
        this.selectedProducts = this.selectedProducts.filter(p => p !== producto);
      }
    }

    calcularTotal(): void {
      if (!this.selectedCard || !this.selectedCard.id) {
        this.msjError = 'Primero debe seleccionar una tarjeta válida.';
        return;
      }

      this.saleService.getTotalPrice(this.selectedCard?.id, this.selectedProducts).subscribe( data => {
        this.totalPrice = data;
      })
    }


    realizarCompra(): void {

      if (this.selectedProducts.length === 0) {
        this.msjError = 'Debe seleccionar al menos un producto.';
        return;
      }

      if (!this.selectedCard) {
        this.msjError = 'Debe seleccionar una tarjeta de crédito.';
        return;
      }

      this.saleService.completePurchase(this.clientId, this.selectedCard.id, this.selectedProducts)
        .subscribe({
          next: () => {
            this.msjOk = 'Venta completada exitosamente'
            this.msjError = '';
          },
          error: (error: string) => {
            console.error("Error al completar la venta:", error);
            this.msjError = error;
          }
        });
    }

    isProductDiscount(discount: Discount): discount is ProductDiscount {
      const result = (discount as ProductDiscount).brandDTO !== undefined;
      console.log('isProductDiscount:', discount, result);
      return result;
    }

    isBuyDiscount(discount: Discount): discount is BuyDiscount {
      const result = (discount as BuyDiscount).cardTypeDTO !== undefined;
      console.log('isBuyDiscount:', discount, result);
      return result;
    }


  }
