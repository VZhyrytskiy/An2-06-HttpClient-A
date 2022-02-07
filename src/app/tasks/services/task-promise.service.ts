import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import type { TaskModel } from './../models/task.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class TaskPromiseService {
  private tasksUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Promise<TaskModel[]> {
    const request$ = this.http.get(this.tasksUrl);
    return firstValueFrom(request$)
      .then(response => response as TaskModel[])
      .catch(this.handleError);
  }

  getTask(id: NonNullable<TaskModel['id']> | string): Promise<TaskModel> {
    const url = `${this.tasksUrl}/${id}`;

    const request$ = this.http.get(url);
    return firstValueFrom(request$)
      .then(response => response as TaskModel)
      .catch(this.handleError);
  }

  updateTask(task: TaskModel): Promise<TaskModel> {
    const url = `${this.tasksUrl}/${task.id}`;
    const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    const request$ = this.http.put(url, task, options);

    return firstValueFrom(request$)
      .then(response => response as TaskModel)
      .catch(this.handleError);
  }

  createTask(task: TaskModel): Promise<TaskModel> {
    const url = this.tasksUrl;
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const request$ = this.http.post(url, task, options);

    return firstValueFrom(request$)
      .then(response => response as TaskModel)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
