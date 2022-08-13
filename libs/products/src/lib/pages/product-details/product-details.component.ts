import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {ActivatedRoute} from "@angular/router";
import {ProductInterface} from "../../models/product";
import {Observable} from "rxjs";
import {CartItem, CartService} from "@bluebits/orders";

@Component({
    selector: 'products-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
    product$?: Observable<ProductInterface>;
    quantity = 1;

    constructor(
      private productsService: ProductsService,
      private route: ActivatedRoute,
      private cartService: CartService
    ) {}

    ngOnInit(): void {
      this.getProduct();
    }

    private getProduct() {
      this.route.params.subscribe(params => {
        if (params['productId']) {
          this.product$ = this.productsService.getProduct(params['productId'])
        }
      })
    }

    addProductToCart(product: ProductInterface) {
      const cartItem: CartItem = {
        productId: `${product.id}`,
        quantity: this.quantity
      }

      this.cartService.addCartItem(cartItem);
    }
}
