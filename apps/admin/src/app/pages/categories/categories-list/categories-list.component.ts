import {Component, OnInit} from '@angular/core';
import {CategoriesService, CategoryInterface} from "@bluebits/products";
import {catchError, EMPTY, Observable} from "rxjs";
import {ConfirmationService, MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent implements OnInit {
    public categories$: Observable<CategoryInterface[]>;

    constructor(
      private categoriesService: CategoriesService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private router: Router
    ) {}

    ngOnInit(): void {
      this.categories$ = this.categoriesService.getCategories();
    }

    onDeleteCategory(id: string) {
      this.confirmationService.confirm({
        message: 'Do you want to delete this category?',
        header: 'Delete Category',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.categoriesService.deleteCategory(id)
            .pipe(
              catchError(() => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Category was not deleted'});

                return EMPTY;
              })
            )
            .subscribe(() => {
              this.messageService.add({severity: 'success', summary: 'Success', detail: 'Category was deleted'});
              this.categories$ = this.categoriesService.getCategories();
            });
        }
      });
    }

    onEditCategory(id: string) {
      this.router.navigateByUrl(`categories/form/${id}`);
    }
}
