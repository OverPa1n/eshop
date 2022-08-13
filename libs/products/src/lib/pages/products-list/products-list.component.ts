import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Observable} from "rxjs";
import {ProductInterface} from "../../models/product";
import {CategoriesService} from "../../services/categories.service";
import {CategoryInterface} from "../../models/category";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'products-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
    products$?: Observable<ProductInterface[]>;
    categories$?: Observable<CategoryInterface[]>;
    selectedCategories?: string[];
    isCategoryPage?: boolean;

    constructor(
      private productsService: ProductsService,
      private categoriesService: CategoriesService,
      private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
      this.getProducts();
      this.categories$ = this.categoriesService.getCategories();
    }

    public categoryFilter() {
      this.products$ = this.productsService.getProducts(this.selectedCategories);
    }

    private getProducts() {
      this.route.params.subscribe(params => {
        if (params['categoryId']) {
          const categoryId = [params['categoryId']];
          this.isCategoryPage = true;

          this.products$ = this.productsService.getProducts(categoryId);
        } else {
          this.isCategoryPage = false;
          this.products$ = this.productsService.getProducts();
        }
      })
    }
}
