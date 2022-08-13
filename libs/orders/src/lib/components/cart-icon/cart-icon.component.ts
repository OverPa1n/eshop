import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Observable} from "rxjs";
import {Cart} from "../../models/cart";

@Component({
    selector: 'orders-cart-icon',
    templateUrl: './cart-icon.component.html',
    styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit {
    cart$?: Observable<Cart>;

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
      this.cart$ = this.cartService.cart$;
    }
}
