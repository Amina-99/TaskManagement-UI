import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from '../../shared/models/User';
import { TaskService } from '../../shared/services/task.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.css']
})
export class EditTaskModalComponent implements OnInit {
  @Output() onTaskEdit = new EventEmitter();
  myControl = new FormControl();
  users: User[] = [];
  filteredOptions!: Observable<User[]>;
  newTaskForm!: FormGroup;
  selectedUserId!: any;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.selectedUserId = this.taskService.taskForEdit.user.userId;

    this.newTaskForm = this.fb.group({
      taskName: [this.taskService.taskForEdit.taskName, Validators.required],
      option: [
        this.taskService.taskForEdit.user.firstName +
          ' ' +
          this.taskService.taskForEdit.user.lastName,
        Validators.required,
      ],
      start: [this.taskService.taskForEdit.startDate, Validators.required],
      end: [this.taskService.taskForEdit.endDate, Validators.required],
      description: [this.taskService.taskForEdit.description],
    });
    this.userService.getAllDropDownUsers().subscribe((data) => {
      this.users = data;
      this.filteredOptions = this.newTaskForm.controls.option.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
    });
  }

  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(
      (user) => user.firstName.toLowerCase().indexOf(filterValue) === 0
    );
  }

  get field() {
    return this.newTaskForm.controls;
  }

  public submit() {
    let errorMessage: string = 'Sorry, your form is not submitted.';
    let message: string = 'Successfully edited task.';
    let action: string = 'Close';
    let invalidFormMessage: string = 'Form is not filled correctly.';
    if (this.newTaskForm.valid) {
      this.taskService
        .editTask({
          userId: this.selectedUserId,
          statusId: this.taskService.taskForEdit.status.statusId,
          description: this.field.description.value,
          startDate: this.field.start.value,
          endDate: this.field.end.value,
          taskName: this.field.taskName.value,
        })
        .subscribe(
          (data: any) => {
            this.onTaskEdit.emit(true);
            this.taskService.taskForEdit = null;
            this.dialog.closeAll();
            this._snackBar.open(message, action, {
              duration: 4000,
            });
          },
          (error: any) => {
            this._snackBar.open(errorMessage, action, {
              duration: 4000,
            });
          }
        );
    } else {
      this._snackBar.open(invalidFormMessage, action, {
        duration: 4000,
      });
    }
  }

  onSelectUser(user: User) {
    this.field.option.setValue(user.firstName + ' ' + user.lastName);
    this.selectedUserId = user.userId;
  }
}