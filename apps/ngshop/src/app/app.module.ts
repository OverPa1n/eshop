import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from './shared/header/header.component';
import {FooterComponent} from './shared/footer/footer.component';
import {UiModule} from '@bluebits/ui';
import {AccordionModule} from 'primeng/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavComponent} from './shared/nav/nav.component';
import {ProductsModule} from '@bluebits/products';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {OrdersModule} from '@bluebits/orders';
import {ToastModule} from 'primeng/toast';
import {MessagesComponent} from './shared/messages/messages.component';
import {JwtInterceptor, UsersModule} from "@bluebits/users";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {NgxStripeModule} from "ngx-stripe";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  }
];

@NgModule({
  declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent, MessagesComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    UiModule,
    AccordionModule,
    BrowserAnimationsModule,
    ProductsModule,
    HttpClientModule,
    OrdersModule,
    ToastModule,
    UsersModule,
    NgxStripeModule.forRoot('pk_test_51LU4jsLx1PQms9JgDmo8ZQ2kG6iPuaHAG8NVvjrmBMGuwzIb7ZkQfEqALCO7Cu0AOJ3oiGnwpwC5heLBfQx6lQE400pcIDMAgg')
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent],
  exports: [MessagesComponent]
})
export class AppModule {
}
