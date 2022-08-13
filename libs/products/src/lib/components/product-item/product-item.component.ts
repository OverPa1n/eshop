import {Component, Input} from '@angular/core';
import {ProductInterface} from "../../models/product";
import {CartItem, CartService} from "@bluebits/orders";

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product: ProductInterface;

  constructor(private cartService: CartService) {
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id as string,
      quantity: 1
    }

    this.cartService.addCartItem(cartItem);
  }
}
