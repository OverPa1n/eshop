import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {map, Subject, takeUntil, tap} from "rxjs";
import {OrdersService} from "../../services/orders.service";
import {CartItemDetailed} from "../../models/cart";

@Component({
    selector: 'orders-cart-details',
    templateUrl: './cart-details.component.html',
    styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit, OnDestroy {
    cartItemsDetailed: CartItemDetailed[] = [];
    cartCount = 0;
    endSubs$: Subject<void> = new Subject<void>()

    constructor(
      private router: Router,
      private cartService: CartService,
      private ordersService: OrdersService
    ) {}

    ngOnInit(): void {
      // TODO: try to refactor this!!!!
      this.cartService.cart$.pipe(
        takeUntil(this.endSubs$),
        tap(() => this.cartItemsDetailed = []),
        map(({items}) => {
          if (items.length) {
            items.map(item => {
              this.ordersService.getProduct(item.productId).subscribe((product) => {
                this.cartItemsDetailed.push({
                  product,
                  quantity: item.quantity
                })
                this.cartCount = +this.cartItemsDetailed?.length;
              })
            })
          }
        })
      ).subscribe();
    }

    ngOnDestroy() {
      this.endSubs$.next();
      this.endSubs$.complete();
    }

  backToShopping() {
    this.router.navigate(['/products']);
  }

  deleteCartItem(cartItem: CartItemDetailed) {
      this.cartService.deleteCartItem(cartItem.product.id);
  }

  updateCartItemQuantity(event, cartItem: CartItemDetailed) {
      this.cartService.addCartItem({
        productId: cartItem.product.id,
        quantity: event.value
      }, true)
  }
}
