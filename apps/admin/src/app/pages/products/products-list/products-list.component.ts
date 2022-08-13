import { Component, OnInit } from '@angular/core';
import {ProductInterface, ProductsService} from "@bluebits/products";
import {catchError, EMPTY, Observable} from "rxjs";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
    products$: Observable<ProductInterface[]>;

    constructor(
      private productsService: ProductsService,
      private router: Router,
      private confirmationService: ConfirmationService,
      private messageService: MessageService,
    ) {}

    ngOnInit(): void {
      this.products$ = this.productsService.getProducts();
    }

  onDeleteProduct(id) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(id)
          .pipe(
            catchError(() => {
              this.messageService.add({severity: 'error', summary: 'Error', detail: 'Product was not deleted'});

              return EMPTY;
            })
          )
          .subscribe(() => {
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Product was deleted'});
            this.products$ = this.productsService.getProducts();
          });
      }
    });
  }

  onEditProduct(id) {
    this.router.navigateByUrl(`products/form/${id}`);
  }
}
