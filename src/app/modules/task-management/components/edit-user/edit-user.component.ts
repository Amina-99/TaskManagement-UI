import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Output() onUserEdited = new EventEmitter();
  editUserForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.editUserForm = this.fb.group({
      firstName: [this.userService.userForEdit.firstName, Validators.required],
      lastName: [this.userService.userForEdit.lastName, Validators.required],
    });
  }

  get field() {
    return this.editUserForm.controls;
  }

  public submit() {
    let errorMessage: string = 'Sorry, your form is not submitted.';
    let message: string = 'Successfully edited user.';
    let action: string = 'Close';
    let invalidFormMessage: string = 'Form is not filled correctly.';
    if (this.editUserForm.valid) {
      this.userService
        .editUser({
          firstName: this.field.firstName.value,
          lastName: this.field.lastName.value,
        },
          this.userService.userForEdit.userId)
        .subscribe(
          (data: any) => {
            this.dialog.closeAll();
            this.snackBar.open(message, action, {
              duration: 4000,
            });
            this.onUserEdited.emit(true);
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