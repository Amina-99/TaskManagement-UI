import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EditTaskModalComponent } from '../../components/edit-task-modal/edit-task-modal.component';
import { NewTaskModalComponent } from '../../components/new-task-modal/new-task-modal.component';
import { Task } from '../../shared/models/Task';
import { LoadingService } from '../../shared/services/loading.service';
import { TaskService } from '../../shared/services/task.service';

class TaskStatus {
  public statusId: number;
  public tasks: Task[];
  constructor(statusId: number, tasks: Task[]) {
    this.statusId = statusId;
    this.tasks = tasks;
  }
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],

})
export class BoardComponent implements  OnInit {
  todo!: TaskStatus;
  done!: TaskStatus;
  isLoading!: Observable<boolean>;
  inProgress!: TaskStatus;

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private loadingService: LoadingService,
    private changeRef: ChangeDetectorRef
  ) {
    this.isLoading = this.loadingService.IsLoadingObservable;
  }

  ngOnInit() {
    this.getTasksData();
  }


  getTasksData() {
    this.taskService.getAllTasks().subscribe((data: Task[]) => {
      this.loadingService.IsLoadingSubject.next(false);
      this.todo = new TaskStatus(
        1,
        data.filter((task) => task.status.statusId == 1)
      );
      this.done = new TaskStatus(
        3,
        data.filter((task) => task.status.statusId == 3)
      );
      this.inProgress = new TaskStatus(
        2,
        data.filter((task) => task.status.statusId == 2)
      );
    });
  }

  openDialog() {
    this.isLoading.subscribe((data)=>{
      console.log(data)
    })
    let dialog = this.dialog.open(NewTaskModalComponent);
    dialog.componentInstance.onTaskAdd.subscribe((data) => {
      if (data) {
        this.getTasksData();
      }
      this.loadingService.IsLoadingSubject.next(false);
    });
    dialog.afterOpened().subscribe((_)=>{
      this.loadingService.IsLoadingSubject.next(false);
    })
    dialog.afterClosed().subscribe((_) => {
      this.loadingService.IsLoadingSubject.next(false);
    });
  }

  openEditDialog(item: any): void {
    this.taskService.taskForEdit = item;
    let dialog = this.dialog.open(EditTaskModalComponent);
    dialog.componentInstance.onTaskEdit.subscribe((data) => {
      if (data) {
        this.getTasksData();
      }
    });
  }

  drop(event: CdkDragDrop<TaskStatus>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data.tasks,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data.tasks,
        event.container.data.tasks,
        event.previousIndex,
        event.currentIndex
      );
      this.taskService
        .updateStatus(
          event.container.data.tasks[event.currentIndex].taskId,
          event.container.data.statusId
        )
        .subscribe((_) => {});
    }
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe((_) => {
      this.getTasksData();
    });
  }
}
