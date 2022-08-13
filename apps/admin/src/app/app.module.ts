import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ShellComponent} from './shared/shell/shell.component';
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import {CategoriesListComponent} from './pages/categories/categories-list/categories-list.component';
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {CategoriesService} from '@bluebits/products';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CategoriesFormComponent} from './pages/categories/categories-form/categories-form.component';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ColorPickerModule} from 'primeng/colorpicker';
import {ProductsListComponent} from './pages/products/products-list/products-list.component';
import {ProductsFormComponent} from './pages/products/products-form/products-form.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import {UsersFormComponent} from './pages/users/users-form/users-form.component';
import {UsersListComponent} from './pages/users/users-list/users-list.component';
import {TagModule} from 'primeng/tag';
import {InputMaskModule} from 'primeng/inputmask';
import {OrdersListComponent} from './pages/orders/orders-list/orders-list.component';
import {OrdersDetailComponent} from './pages/orders/orders-detail/orders-detail.component';
import {FieldsetModule} from "primeng/fieldset";
import {JwtInterceptor, UsersModule} from "@bluebits/users";
import {AppRoutingModule} from "./app-routing.module";
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from "@ngrx/effects";
import {NgxStripeModule} from "ngx-stripe";

const UX_MODULE = [
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    ColorPickerModule,
    InputNumberModule,
    InputTextareaModule,
    InputSwitchModule,
    DropdownModule,
    EditorModule,
  FieldsetModule
];

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        ShellComponent,
        SidebarComponent,
        CategoriesListComponent,
        CategoriesFormComponent,
        ProductsListComponent,
        ProductsFormComponent,
        UsersFormComponent,
        UsersListComponent,
        OrdersListComponent,
        OrdersDetailComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
      BrowserAnimationsModule,
      FormsModule,
      TagModule,
      InputMaskModule,
      UsersModule,
      AppRoutingModule,
      ...UX_MODULE,
      StoreModule.forRoot({}, {}),
      EffectsModule.forRoot([]),
      NgxStripeModule.forRoot('pk_test_51LU4jsLx1PQms9JgDmo8ZQ2kG6iPuaHAG8NVvjrmBMGuwzIb7ZkQfEqALCO7Cu0AOJ3oiGnwpwC5heLBfQx6lQE400pcIDMAgg')
    ],
    providers: [
      CategoriesService,
      MessageService,
      ConfirmationService,
      {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
