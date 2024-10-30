import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Sale} from "../models/sale";
import {SaleService} from "../services/sale.service";
import {CurrencyPipe, NgFor, NgIf} from "@angular/common";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-info',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, CurrencyPipe],
  templateUrl: './modal-info.component.html',
  styleUrl: './modal-info.component.css'
})
export class ModalInfoComponent {

  @Input() idClient: number | null = null;
  @Output() closeModal = new EventEmitter<void>();

  latestSales: Sale[] = [];

  constructor(private saleService: SaleService) {}

  ngOnInit(): void {
    if (this.idClient) {
      this.saleService.latestSales(this.idClient).subscribe((sales) => {
        this.latestSales = sales;
      });
    }
    /*else {
      this.saleService.getSales().subscribe((sales)=> {
        this.latestSales = sales;
      })
    }*/
  }
  onClose(){
    this.closeModal.emit();
  }
}
