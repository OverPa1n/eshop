import {Component, OnInit} from '@angular/core';
import {OrderInterface, OrdersService, ORDER_STATUS} from "@bluebits/orders";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {MessageService} from "primeng/api";

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss']
})
export class OrdersDetailComponent implements OnInit {
  order$: Observable<OrderInterface>;
  currentOrderId: string;
  orderStatuses: { id: string, label: string }[];

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.orderStatuses = Object.entries(ORDER_STATUS).map(([id, status]) => {
      return {
        id,
        label: status.label
      }
    });

    this.route.params.subscribe(params => {
      if (params.id) {
        this.currentOrderId = params.id;
        this.order$ = this.ordersService.getOrder(params.id);
      }
    })
  }

  onStatusChange({value}) {
    this.ordersService.editOrder(this.currentOrderId, value).subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'Success', detail: `Order is updated`});
    }, () => {
      this.messageService.add({severity: 'error', summary: 'Error', detail: `Order is not updated`});
    });
    console.log(value);
  }
}
