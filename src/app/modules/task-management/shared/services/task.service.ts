import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { NewTask } from '../interfaces/newTask';
import { Task } from '../models/Task';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.apiUrl;
  taskForEdit: any = null;

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  addNewTask(task: NewTask) {
    this.loadingService.IsLoadingSubject.next(true);
    return this.http.post(this.apiUrl + '/api/Tasks', {
      taskName: task.taskName,
      userId: task.userId,
      statusId: task.statusId,
      description: task.description,
      startDate: task.startDate,
      endDate: task.endDate,
    });
  }

  getAllTasks(): Observable<any> {
    this.loadingService.IsLoadingSubject.next(true);
    return this.http.get(this.apiUrl + '/api/Tasks');
  }

  updateStatus(taskId: number, statusId: number) {
    return this.http.put(
      this.apiUrl + '/api/Tasks/status/' + taskId + '/' + statusId,
      {}
    );
  }

  editTask(task: any): Observable<any> {
    return this.http.put(
      this.apiUrl + '/api/Tasks/' + this.taskForEdit.taskId,
      task
    );
  }

  updateTaskCalendar(event: any) {
    return this.http.put(this.apiUrl + '/api/Tasks/' + event.meta.taskId, {
      taskName: event.title,
      userId: event.meta.userId,
      statusId: event.meta.statusId,
      description: event.meta.description,
      startDate: event.start.toISOString(),
      endDate: event.end.toISOString(),
    });
  }

  deleteTask(task: Task) {
    return this.http.delete(this.apiUrl + '/api/Tasks/' + task.taskId);
  }
}
