import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoriesService, CategoryInterface, ProductInterface, ProductsService} from "@bluebits/products";
import {catchError, EMPTY, Observable, timer} from "rxjs";
import {MessageService} from "primeng/api";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'admin-products-form',
    templateUrl: './products-form.component.html',
    styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit {
    editMode: boolean;
    productsForm: FormGroup;
    isSubmitted: boolean;
    categories: Observable<CategoryInterface[]>;
    imageDisplay: string | ArrayBuffer;
    currentProductId: string;

    constructor(private fb: FormBuilder,
                private categoriesService: CategoriesService,
                private productsService: ProductsService,
                private messageService: MessageService,
                private location: Location,
                private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
      this.initForm();
      this.categories = this.categoriesService.getCategories();
      this.checkEditMode();
    }

    initForm() {
      this.productsForm = this.fb.group({
        name: ['', Validators.required],
        brand: ['', Validators.required],
        price: ['', Validators.required],
        category: ['', Validators.required],
        countInStock: ['', Validators.required],
        description: ['', Validators.required],
        richDescription: [''],
        image: ['', Validators.required],
        isFeatured: [false]
      })
    }

  private checkEditMode() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.editMode = !!params.id;
        this.currentProductId = params.id;
        this.productsService.getProduct(params.id).subscribe(product => {
          this.productsForm.patchValue({...product, category: product.category.id});
          this.imageDisplay = product.image;
          this.productsForm.get('image').setValidators([]);
          this.productsForm.get('image').updateValueAndValidity();
        })
      }
    })
  }

  onSubmit() {
      this.isSubmitted = true;

    if (this.productsForm.invalid) {
      return;
    }

    const productFormData = new FormData();

    Object.keys(this.productsForm.controls).forEach(key => {
      productFormData.append(key, this.productsForm.get(key).value)
    });

    if (this.editMode) {
      this.updateProduct(productFormData);
    } else {
      this.createProduct(productFormData);
    }
  }

  private updateProduct(productFormData: FormData) {
    this.productsService.editProduct(this.currentProductId, productFormData)
      .pipe(
        catchError(() => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: `Product is not updated`});

          return EMPTY;
        })
      )
      .subscribe((category: CategoryInterface) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: `Product ${category.name} is updated`});

        timer(1000).toPromise().then(() => {
          this.location.back();
        });
      });
  }

  private createProduct(productData: FormData) {
    this.productsService.createProduct(productData)
      .pipe(
        catchError(() => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: `Product was not added`});

          return EMPTY;
        })
      )
      .subscribe((product: ProductInterface) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: `Product ${product.name} is created`});

        timer(1000).toPromise().then(() => {
          this.location.back();
        });
      });
  }

  onImageUpload(event) {
      const file = event.target.files[0]

      if (file) {
        this.productsForm.patchValue({image: file});
        this.productsForm.get('image').updateValueAndValidity();

        const fileReader = new FileReader();

        fileReader.onload = () => {
          this.imageDisplay = fileReader.result;
        };

        fileReader.readAsDataURL(file);
      }
  }
}
