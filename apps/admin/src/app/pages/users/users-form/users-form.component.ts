import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {UserInterface, UsersService} from '@bluebits/users';
import {MessageService} from 'primeng/api';
import {timer} from 'rxjs';

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styles: []
})
export class UsersFormComponent implements OnInit {
  usersForm: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentUserId: string;
  countries: { id: string; name: string }[]

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initUserForm();
    this.getCountries();
    this.checkEditMode();
  }

  private initUserForm() {
    this.usersForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: ['']
    });
  }

  private getCountries() {
    this.countries = this.usersService.getCountries();
  }

  private addUser(user: UserInterface) {
    this.usersService.createUser(user).subscribe(
      (user: UserInterface) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User ${user.name} is created!`
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not created!'
        });
      }
    );
  }

  private updateUser(id, user: UserInterface) {
    this.usersService.updateUser(id, user).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User is updated!'
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not updated!'
        });
      }
    );
  }

  private checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentUserId = params.id;
        this.usersService.getUser(params.id).subscribe((user) => {
          this.usersForm.patchValue(user);

          this.usersForm.get('password').setValidators([]);
          this.usersForm.get('password').updateValueAndValidity();
        });
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.usersForm.invalid) {
      return;
    }

    if (this.editMode) {
      this.updateUser(this.currentUserId, this.usersForm.value);
    } else {
      this.addUser(this.usersForm.value);
    }
  }

  onCancel() {
    this.location.back();
  }
}

