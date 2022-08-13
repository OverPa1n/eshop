import { Component, OnInit } from '@angular/core';
import {ProductInterface} from "../../models/product";
import {ProductsService} from "../../services/products.service";
import {Observable} from "rxjs";

@Component({
    selector: 'products-featured-products',
    templateUrl: './featured-products.component.html',
    styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent implements OnInit {
    featuredProducts$?: Observable<ProductInterface[]>
    constructor(private productsService: ProductsService) {}

    ngOnInit(): void {
    this.featuredProducts$ = this.productsService.getFeaturedProducts(4)
    }
}
