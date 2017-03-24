import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from './../../models/task';

@Component({
  selector: 'task',
  templateUrl: 'task.component.html',
  styleUrls: ['task.component.css']
})
export class TaskComponent {
  @Input() task: Task;
  @Output() onComplete = new EventEmitter<Task>();
  @Output() onDelete = new EventEmitter<Task>();

  constructor(
    private router: Router
  ) { }

  completeTask(event: any): void {
    this.onComplete.emit(this.task);
  }

  deleteTask(task: Task) {
    this.onDelete.emit(task);
  }

  editTask(task: Task) {
    let link = ['edit', task.id];
    this.router.navigate(link);
  }
}
