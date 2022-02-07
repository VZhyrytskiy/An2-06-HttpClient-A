import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskArrayService } from './../../services/task-array.service';

import type { OnInit } from '@angular/core';
import type { TaskModel } from './../../models/task.model';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks!: Promise<Array<TaskModel>>;

  constructor(
    private router: Router,
    private taskArrayService: TaskArrayService
  ) {}

  ngOnInit(): void {
    this.tasks = this.taskArrayService.getTasks();
  }

  onCompleteTask(task: TaskModel): void {
    const updatedTask = { ...task, done: true };
    this.taskArrayService.updateTask(updatedTask);
  }

  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id];
    this.router.navigate(link);
  }
}
