import { Component, OnInit } from '@angular/core';
import { UserRead } from '../../shared/interfaces/UserRead';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewUserComponent } from '../../components/new-user/new-user.component';
import { EditUserComponent } from '../../components/edit-user/edit-user.component';
import { last } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: any;
  isLoading: Observable<boolean>;
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'deleteUser',
    'editUser',
  ];

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private loadingService: LoadingService
  ) {
    this.isLoading = this.loadingService.IsLoadingObservable;
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe((data: User[]) => {
      this.users = new MatTableDataSource(data);
      this.loadingService.IsLoadingSubject.next(false);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    let dialogReference = this.dialog.open(NewUserComponent);
    dialogReference.componentInstance.onUserAdd.subscribe((data) => {
      if (data) {
        this.getUsers();
      }
    });
  }

  openEditUserDialog(firstName: string, lastName: string, userId: number): void {
    this.userService.userForEdit = {firstName: firstName, lastName: lastName, userId: userId};
    let dialog = this.dialog.open(EditUserComponent);
    dialog.componentInstance.onUserEdited.subscribe((data)=>{
      if (data){
        this.getUsers();
      }
    })
  }

  deleteUser(userId: number): void {
    if (confirm("Are you sure that you want to delete user?")) {
      this.userService.deleteUser(userId)
        .subscribe(response => {
          this.getUsers();
        });
    }
  }
}