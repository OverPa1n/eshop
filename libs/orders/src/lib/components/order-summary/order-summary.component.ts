import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {map, Subject, take, takeUntil} from "rxjs";
import {OrdersService} from "../../services/orders.service";
import {Router} from "@angular/router";
import {ProductInterface} from "@bluebits/products";

@Component({
    selector: 'orders-order-summary',
    templateUrl: './order-summary.component.html',
    styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
    totalPrice = 0;
    isCheckout = false;
    endSubs$ = new Subject<void>();

    constructor(private cartService: CartService, private ordersService: OrdersService, private router: Router) {
      this.isCheckout = this.router.url.includes('checkout');
    }

    ngOnInit(): void {
      this.getOrderSummary();
    }

    ngOnDestroy() {
      this.endSubs$.next();
      this.endSubs$.complete();
    }

  getOrderSummary() {
      this.cartService.cart$
        .pipe(
          takeUntil(this.endSubs$),
          map(({items}) => {
            this.totalPrice = 0;

            if (items.length) {
              items.map(item => {
                this.ordersService.getProduct(item.productId)
                  .pipe(take(1))
                  .subscribe((product: ProductInterface) => {
                    if (product.price) {
                      this.totalPrice += +product.price * item.quantity;
                    }
                  })
              })
            }
          })
        ).subscribe()
    }

  navigateToCheckout() {
      this.router.navigate(['/checkout']);
  }
}
