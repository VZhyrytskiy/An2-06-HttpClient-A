import { Component } from '@angular/core';
import type { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import type { ParamMap } from '@angular/router';

// rxjs
import { map, switchMap } from 'rxjs';

import { TaskModel } from './../../models/task.model';
import { TaskArrayService, TaskPromiseService } from './../../services';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task!: TaskModel;

  constructor(
    private taskArrayService: TaskArrayService,
    private taskPromiseService: TaskPromiseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.task = new TaskModel();

    // it is not necessary to save subscription to route.paramMap
    // when router destroys this component, it handles subscriptions automatically
    const observer = {
      next: (task: TaskModel) => (this.task = { ...task }),
      error: (err: any) => console.log(err)
    };
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
             // notes about "!"
             // params.get() returns string | null, but getTask takes string | number
             // in this case taskID is a path param and can not be null
             this.taskPromiseService.getTask(params.get('taskID')!)
        ),
        // transform undefined => {}
        map(el => el ? el : {} as TaskModel)
      )
      .subscribe(observer);
  }

  onSaveTask(): void {
    const task = { ...this.task } as TaskModel;

    if (task.id) {
      this.taskPromiseService.updateTask(task).then(() => this.onGoBack());
    } else {
      this.taskArrayService.createTask(task);
      this.onGoBack();
    }
  }

  onGoBack(): void {
    this.router.navigate(['/home']);
  }
}
