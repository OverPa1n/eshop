import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {CartService} from "@bluebits/orders";

@Component({
    selector: 'ngshop-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
    constructor(private messageService: MessageService, private cartService: CartService) {}

    ngOnInit(): void {
      this.cartService.cart$.subscribe((data) => {
        if (data.action) {
          this.messageService.add({severity: 'success', summary: 'Success', detail: `Product was ${data.action === 'add' ? 'added' : 'deleted'}`});
        }
      })
    }
}
