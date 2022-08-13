import { Component, OnInit } from '@angular/core';
import {CategoryInterface} from "../../models/category";
import {CategoriesService} from "../../services/categories.service";
import {Observable} from "rxjs";

@Component({
    selector: 'products-categories-banner',
    templateUrl: './categories-banner.component.html',
    styleUrls: ['./categories-banner.component.scss']
})
export class CategoriesBannerComponent implements OnInit {

    categories$?: Observable<CategoryInterface[]>;

    constructor(private categoriesService: CategoriesService) {}

    ngOnInit(): void {
      this.categories$ = this.categoriesService.getCategories()
    }
}
