import {  AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
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
import { LoadingService } from '../../shared/services/loading.service';
import { TaskService } from '../../shared/services/task.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.css']
})
export class NewTaskModalComponent implements OnInit {
  @Output() onTaskAdd = new EventEmitter<boolean>(false);
  myControl = new FormControl();
  users: User[] = [];
  filteredOptions!: Observable<User[]>;
  newTaskForm!: FormGroup;
  selectedUserId!: any;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.newTaskForm = this.fb.group({
      taskName: ['', Validators.required],
      option: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.userService.getAllDropDownUsers().subscribe((data) => {
      this.users = data;
      this.filteredOptions = this.newTaskForm.controls.option.valueChanges.pipe(
        startWith(''),
        map((value) => this.filter(value))
      );

    });
  }

  private filter(value: string): User[] {
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
    let message: string = 'Successfully added new task.';
    let action: string = 'Close';
    let invalidFormMessage: string = 'Form is not filled correctly.';
    if (this.newTaskForm.valid) {
      this.taskService
        .addNewTask({
          userId: this.selectedUserId,
          statusId: 1,
          description: this.field.description.value,
          startDate: this.field.start.value,
          endDate: this.field.end.value,
          taskName: this.field.taskName.value,
        })
        .subscribe(
          (data: any) => {
            this.onTaskAdd.emit(true);
            this.dialog.closeAll();
            this.snackBar.open(message, action, {
              duration: 4000,
            });
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

  onSelectUser(user: User) {
    this.field.option.setValue(user.firstName + ' ' + user.lastName);
    this.selectedUserId = user.userId;
  }
}
