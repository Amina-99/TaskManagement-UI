import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskManagementRoutingModule } from './task-management-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { BoardComponent } from './pages/board/board.component';
import { NewTaskModalComponent } from './components/new-task-modal/new-task-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { EditTaskModalComponent } from './components/edit-task-modal/edit-task-modal.component';
import { MatTableModule } from '@angular/material/table';
import { NewUserComponent } from './components/new-user/new-user.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditUserComponent } from './components/edit-user/edit-user.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    TaskManagementRoutingModule,
    MatButtonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    DragDropModule,
    MatGridListModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    BoardComponent,
    NewTaskModalComponent,
    CalendarComponent,
    UserManagementComponent,
    NewUserComponent,
    EditTaskModalComponent,
    EditUserComponent
  ]
})
export class TaskManagementModule {}
