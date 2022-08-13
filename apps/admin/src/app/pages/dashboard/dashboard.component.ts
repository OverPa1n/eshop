import { Component, OnInit } from '@angular/core';
import {UsersService} from "@bluebits/users";
import {OrdersService} from "@bluebits/orders";
import {ProductsService} from "@bluebits/products";
import {combineLatest, map, Observable} from "rxjs";

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    statistics$: Observable<{[key: string]: number}>;

    constructor(
      private usersService: UsersService,
      private ordersService: OrdersService,
      private productsService: ProductsService
    ) {}

    ngOnInit(): void {
      this.getStatistics();
    }

    getStatistics() {
      this.statistics$ = combineLatest([
        this.usersService.getUsersCount(),
        this.ordersService.getOrderCount(),
        this.ordersService.getTotalSales(),
        this.productsService.getProductsCount()
      ]).pipe(
        map(([usersCount, ordersCount, totalSales, productsCount]) => {
          return {usersCount, ordersCount, totalSales, productsCount}
        })
      )
    }
}
