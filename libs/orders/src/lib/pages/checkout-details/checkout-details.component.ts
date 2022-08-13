import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UsersService} from '@bluebits/users';
import {OrderItemInterface} from "../../models/order-item";
import {OrderInterface} from "../../models/order";
import {CartService} from "../../services/cart.service";
import {OrdersService} from "../../services/orders.service";
import {ORDER_STATUS} from "../../order.constants";
import {filter, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'orders-checkout-details',
  templateUrl: './checkout-details.component.html'
})
export class CheckoutDetailsComponent implements OnInit, OnDestroy {
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: OrderItemInterface[];
  userId: string;
  countries?: { id: string; name: string }[];
  unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.initCheckoutForm();
    this.orderItems = this.cartService.getCartItemFromLocalStorage.items
      .map(item => ({product: item.productId, quantity: item.quantity}));
    this.getCountries();
    this.autoFillUserData();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['Ukraine', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private getCountries() {
    this.countries = this.usersService.getCountries();
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;

    if (this.checkoutFormGroup?.invalid) {
      return;
    }

    const order: OrderInterface = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm['street'].value,
      shippingAddress2: this.checkoutForm['apartment'].value,
      city: this.checkoutForm['city'].value,
      zip: this.checkoutForm['zip'].value,
      country: this.checkoutForm['country'].value,
      phone: this.checkoutForm['phone'].value,
      status: +Object.keys(ORDER_STATUS)[0],
      user: this.userId,
      dateOrdered: `${Date.now()}`
    };

    this.ordersService.cacheOrderData(order);

    this.ordersService.createCheckoutSession(this.orderItems)
      .subscribe(error => {
        if (error) {
          console.log('error redirect to payment');
        }
      })
  }

  get checkoutForm() {
    return this.checkoutFormGroup?.controls;
  }

  autoFillUserData() {
    this.usersService.observeCurrentUser().pipe(
      takeUntil(this.unsubscribe$),
      filter(Boolean)
    ).subscribe(user => {
      this.userId = user.id ?? '';
      this.checkoutForm['name'].setValue(user?.name);
      this.checkoutForm['email'].setValue(user?.email);
      this.checkoutForm['phone'].setValue(user?.phone);
      this.checkoutForm['city'].setValue(user?.city);
      this.checkoutForm['country'].setValue(user.country);
      this.checkoutForm['street'].setValue(user?.street);
      this.checkoutForm['apartment'].setValue(user?.apartment);
      this.checkoutForm['zip'].setValue(user?.zip);
    })
  }
}
