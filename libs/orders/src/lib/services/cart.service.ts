import {Injectable} from '@angular/core';
import {Cart, CartItem} from "../models/cart";
import {BehaviorSubject} from "rxjs";

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject: BehaviorSubject<{items: CartItem[], action?: string}> = (
    new BehaviorSubject<{items: CartItem[], action?: string}>({items: [], action: ''})
);
  cart$ = this.cartSubject.asObservable();

  setItemInLocalStorage(item: {items: []}) {
    localStorage.setItem(CART_KEY, JSON.stringify(item))
  }

  get getCartItemFromLocalStorage(): Cart {
    return JSON.parse(localStorage.getItem(CART_KEY) as string);
  }

  initCarLocalStorage() {
    const cart: Cart = this.getCartItemFromLocalStorage;

    if (!cart) {
      const initialCart = {
        items: []
      }

      localStorage.setItem(CART_KEY, JSON.stringify(initialCart));
    } else {
      this.cartSubject.next({items: cart.items, action: ''});
    }
  }

  addCartItem(cartItem: CartItem, updateCartItem?: boolean) {
    const cart: Cart = this.getCartItemFromLocalStorage;
    const cartItemsExist = cart.items.find(item => item.productId === cartItem.productId);

    // TODO: consider about refactoring this chunk
    if (cartItemsExist) {
      cart.items.forEach(item => {
        if (cartItem.productId === item.productId) {
          if (updateCartItem) {
            item.quantity = cartItem.quantity;
          } else {
            item.quantity = item.quantity + cartItem.quantity;
          }
        }
      })
    } else {
      cart.items.push(cartItem);
    }

    const newCart = {...cart} as {items: []};

    this.cartSubject.next({items: cart.items, action: 'add'});
    this.setItemInLocalStorage(newCart)
  }

  deleteCartItem(productId: string) {
    const cart = this.getCartItemFromLocalStorage;
    cart.items = cart.items.filter(item => productId !== item.productId);
    const cartForDelete = {...cart} as {items: []}


    this.setItemInLocalStorage((cartForDelete));
    this.cartSubject.next({items: cart.items, action: 'delete'});
  }

  emptyCart() {
    const initialCart = {
      items: []
    } as {items: []};

    this.cartSubject.next(initialCart);
    this.setItemInLocalStorage(initialCart);
  }
}
