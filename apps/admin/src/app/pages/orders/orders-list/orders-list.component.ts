import { Component, OnInit } from '@angular/core';
import {OrderInterface, OrdersService, ORDER_STATUS} from "@bluebits/orders";
import {catchError, EMPTY, Observable} from "rxjs";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
    selector: 'admin-orders-list',
    templateUrl: './orders-list.component.html',
    styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
    orders$: Observable<OrderInterface[]>;
    orderStatus = ORDER_STATUS;

    constructor(
      private ordersService: OrdersService,
      private router: Router,
      private confirmationService: ConfirmationService,
      private messageService: MessageService
    ) {}

    ngOnInit(): void {
      this.orders$ = this.ordersService.getOrders();
    }

    showOrder(id: string) {
      this.router.navigateByUrl(`orders/${id}`)
    }

  onDeleteOder(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(id)
          .pipe(
            catchError(() => {
              this.messageService.add({severity: 'error', summary: 'Error', detail: 'Order was not deleted'});

              return EMPTY;
            })
          )
          .subscribe(() => {
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Order was deleted'});
            this.orders$ = this.ordersService.getOrders();
          });
      }
    });
  }
}
