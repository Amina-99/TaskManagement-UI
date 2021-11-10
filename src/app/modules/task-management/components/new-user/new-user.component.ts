import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  @Output() onUserAdd = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  newUserForm!: FormGroup;

  ngOnInit() {
    this.newUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  get field() {
    return this.newUserForm.controls;
  }

  public submit() {
    let errorMessage: string = 'Sorry, your form is not submitted.';
    let message: string = 'Successfully added new user.';
    let action: string = 'Close';
    let invalidFormMessage: string = 'Form is not filled correctly.';
    if (this.newUserForm.valid) {
      this.userService
        .addNewUser({
          firstName: this.field.firstName.value,
          lastName: this.field.lastName.value,
        })
        .subscribe(
          (data: any) => {
            this.dialog.closeAll();
            this.snackBar.open(message, action, {
              duration: 4000,
            });
            this.onUserAdd.emit(true);
          },
          (error: any) => {
            this.snackBar.open(errorMessage, action, {
              duration: 4000,
            });
          }
        );
    } else {
      this.snackBar.open(invalidFormMessage, action, {
        duration: 4000,
      });
    }
  }
}
