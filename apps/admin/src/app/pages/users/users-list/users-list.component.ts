import { Component, OnInit } from '@angular/core';
import {UserInterface, UsersService} from "@bluebits/users";
import {ConfirmationService, MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
    selector: 'admin-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users$: Observable<UserInterface[]>;

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.users$ = this.usersService.getUsers();
  }

  onDeleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this User?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userId).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User is deleted!'
            });
            this.users$ =  this.usersService.getUsers();
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'User is not deleted!'
            });
          }
        );
      }
    });
  }

  onEditUser(userid: string) {
    this.router.navigateByUrl(`users/form/${userid}`);
  }

  getCountryName(countryKey: string) {
    if (countryKey) return this.usersService.getCountry(countryKey);
  }
}
