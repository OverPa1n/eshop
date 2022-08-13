import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoriesService, CategoryInterface} from "@bluebits/products";
import {MessageService} from "primeng/api";
import {catchError, EMPTY, timer} from "rxjs";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  categoriesForm: FormGroup;
  isSubmitted: boolean;
  editMode = false;
  currentCategoryId: string;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.initForm();

    this.checkEditMode();
  }

  private checkEditMode() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.editMode = !!params.id;
        this.currentCategoryId = params.id;
        this.categoriesService.getCategory(params.id).subscribe(category => {
          this.categoriesForm.patchValue(category);
        })
      }
    })
  }

  private createCategory() {
    this.categoriesService.addCategory(this.categoriesForm.value)
      .pipe(
        catchError(() => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: `Category was not added`});

          return EMPTY;
        })
      )
      .subscribe((category: CategoryInterface) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: `Category ${category.name} is created`});

        timer(1000).toPromise().then(() => {
          this.location.back();
        });
      });
  }

  private updateCategory() {
    this.categoriesService.editCategory(this.currentCategoryId, this.categoriesForm.value)
      .pipe(
        catchError(() => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: `Category is not updated`});

          return EMPTY;
        })
      )
      .subscribe((category: CategoryInterface) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: `Category ${category.name} is updated`});

        timer(1000).toPromise().then(() => {
          this.location.back();
        });
      });
  }

  formControl(name) {
    return this.categoriesForm.get(name);
  }

  initForm() {
    this.categoriesForm = this.fb.group({
      name: ['', [Validators.required]],
      icon: ['', [Validators.required]],
      color: ['#fff']
    })
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.categoriesForm.invalid) {
      return;
    }

    if (this.editMode) {
      this.updateCategory();
    } else {
      this.createCategory();
    }
  }

  onCancel() {
    return this.location.back();
  }
}
