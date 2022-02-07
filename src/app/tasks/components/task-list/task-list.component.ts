import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskPromiseService } from './../../services';
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
    private taskPromiseService: TaskPromiseService
  ) {}

  ngOnInit(): void {
    this.tasks = this.taskPromiseService.getTasks();
  }

  onCompleteTask(task: TaskModel): void {
    this.updateTask(task).catch(err => console.log(err));
  }

  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id];
    this.router.navigate(link);
  }

  private async updateTask(task: TaskModel) {
    const updatedTask = await this.taskPromiseService.updateTask({
      ...task,
      done: true
    });

    const tasks: TaskModel[] = await this.tasks;
    const index = tasks.findIndex(t => t.id === updatedTask.id);
    tasks[index] = { ...updatedTask };
  }
}
