import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { BoardComponent } from './pages/board/board.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';

const routes: Routes = [
  {
    path: 'home',
    component: BoardComponent,
  },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
  {
    path: 'users',
    component: UserManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskManagementRoutingModule {}
