import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { MessageService } from 'primeng/api';
import { CartDetailsComponent } from './pages/cart-details/cart-details.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CheckoutDetailsComponent } from './pages/checkout-details/checkout-details.component';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import {AuthGuard} from "@bluebits/users";

const routes: Routes = [
    {
        path: 'cart',
        component: CartDetailsComponent
    },
    {
        path: 'checkout',
        canActivate: [AuthGuard],
        component: CheckoutDetailsComponent
    },
  {
    path: 'success',
    component: ThankYouComponent
  }
];

@NgModule({
    imports: [
        CommonModule,
        BadgeModule,
        RouterModule.forChild(routes),
        ButtonModule,
        InputNumberModule,
        FormsModule,
        ToastModule,
        CardModule,
        ToolbarModule,
        ReactiveFormsModule,
        InputMaskModule,
        InputTextModule,
        InputSwitchModule,
        DropdownModule
    ],
    providers: [CartService, MessageService],
    declarations: [CartIconComponent, CartDetailsComponent, OrderSummaryComponent, CheckoutDetailsComponent, ThankYouComponent],
    exports: [CartIconComponent, CartDetailsComponent, OrderSummaryComponent, CheckoutDetailsComponent, ThankYouComponent]
})
export class OrdersModule {
    constructor(cartService: CartService) {
        cartService.initCarLocalStorage();
    }
}
