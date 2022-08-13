import {Component, OnInit} from '@angular/core';
import {OrdersService} from "../../services/orders.service";
import {CartService} from "../../services/cart.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'orders-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
  constructor(
    private ordersService: OrdersService,
    private cartService: CartService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.createOrder();
  }

  createOrder() {
    const orderData = this.ordersService.getCachedOrderData();

    this.ordersService.addOrder(orderData).subscribe(() => {
      this.cartService.emptyCart();
      this.ordersService.removeCachedOrderData();
    }, (error) => {
      this.messageService.add({severity: 'error', summary: 'Error', detail: error});
    })
  }
}
