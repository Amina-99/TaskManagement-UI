import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/services/task.service';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { Observable, Subject } from 'rxjs';
import { startOfDay, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Task } from '../../shared/models/Task';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();
  isLoading: Observable<boolean>;
  events: CalendarEvent[] = [];
  activeDayIsOpen = true;

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService
  ) {
    this.isLoading = this.loadingService.IsLoadingObservable;
  }

  ngOnInit() {
    this.getTasks();
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getTasks() {
    this.taskService.getAllTasks().subscribe((data: Task[]) => {
      data.forEach((taskElement) => {
        let color = this.getRandomColor();
        this.events.push({
          start: addHours(startOfDay(new Date(taskElement.startDate)), 2),
          end: addHours(new Date(taskElement.endDate), 2),
          title: taskElement.taskName,
          color: {
            primary: color,
            secondary: color,
          },
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          meta: {
            taskId: taskElement.taskId,
            userId: taskElement.user.userId,
            statusId: taskElement.status.statusId,
            description: taskElement.description,
          },
          draggable: true,
        });
      });
      this.loadingService.IsLoadingSubject.next(false);
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });

    let updatedEvent = event;
    updatedEvent.start = newStart;
    updatedEvent.end = newEnd;

    this.taskService.updateTaskCalendar(updatedEvent).subscribe(
      (_) => {
        this.snackBar.open('Task successfully updated', 'Close', {
          duration: 2000,
        });
      },
      (error) => {
        this.snackBar.open(error.message, 'Close', {
          duration: 2000,
        });
        return;
      }
    );
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
