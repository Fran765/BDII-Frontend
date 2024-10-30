  import { Component } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
  import { FormsModule } from "@angular/forms";
  import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
  import { ProductService } from "../services/product.service";
  import {Product, ProductUpdate} from "../models/product"
  import { CreditCard } from "../models/creditCard";
  import { ClientService } from "../services/client.service";
  import { Discount } from "../models/discount";
  import { ProductDiscount } from "../models/productDiscount";
  import { BuyDiscount } from "../models/buyDiscount";
  import { DiscountService } from "../services/discount.service";
  import { SaleService } from "../services/sale.service";
  import { ModalComponent } from "../modal/modal.component";
  import {ModalInfoComponent} from "../modal-info/modal-info.component";

  @Component({
  selector: 'app-store',
  standalone: true,
    imports: [FormsModule,
      NgFor,
      NgIf,
      CurrencyPipe, ModalComponent, ModalInfoComponent],
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
    showModal: boolean = false;
    productToEdit: Product | null = null;
    showModalInfo: boolean = false;


    constructor(private route: ActivatedRoute,
                private productoService: ProductService,
                private clientService: ClientService,
                private discountService: DiscountService,
                private saleService: SaleService
    ) {
    }

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

      this.refreshProducts();

      this.discountService.getDiscounts()
        .subscribe(
          data => {
            this.discounts = data;
          },
          (error) => {
            this.msjError = 'Error al obtener los descuentos: ' + error
          });
    }

    cargarTarjetasCliente(clientId: number): void {

      this.clientService.getCards(clientId)
        .subscribe(
          (data) => {
            this.clientCards = data;
            this.msjError = ''
          },
          (error) => {
            this.msjError = 'Error al obtener las tarjetas del cliente.'
          });
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

      if (this.selectedProducts.length === 0) {
        this.msjError = 'Debe seleccionar al menos un producto.';
        return;
      }

      this.saleService.getTotalPrice(this.selectedCard?.id, this.selectedProducts)
        .subscribe(
          (data) => {
            this.totalPrice = data;
            this.msjOk = ''
            this.msjError = '';
          },
          (error) => {
            this.msjError = 'Error al obtener el precio total.'
          });
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
            this.msjOk = 'Venta completada exitosamente.'
            this.msjError = '';
          },
          error: (error: string) => {
            this.msjError = 'Error al querer finalizar la compra.';
          }
        });
    }

    isProductDiscount(discount: Discount): discount is ProductDiscount {
      return (discount as ProductDiscount).brandDTO !== undefined;
    }

    isBuyDiscount(discount: Discount): discount is BuyDiscount {
      return (discount as BuyDiscount).cardType !== undefined;
    }

    openModal(product: Product): void {
      this.productToEdit = product;
      this.showModal = true;
    }

    closeModal(): void {
      this.showModal = false;
      this.productToEdit = null;
      //location.reload();
    }

    saveProductChanges(updatedProduct: ProductUpdate): void {
      this.productoService.updateProduct(updatedProduct.id, updatedProduct)
        .subscribe(
          () => {

            this.refreshProducts();
            this.msjOk = 'Producto actualizado exitosamente.';
          },
          (error) => {
            this.msjError = 'Ups: ' + error;
          }
        );
    }

    private refreshProducts(): void {
      this.productoService.getProductos()
        .subscribe(
          (data) => {
            this.products = data;
            this.msjError = '';
          },
          (error) => {
            this.msjError = 'Error al obtener los productos: ' + error;
          }
        );
    }

    infoUltimasCompras(): void{
      this.showModalInfo = !this.showModalInfo;
    }
  }
