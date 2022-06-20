import { NgModule } from '@angular/core';
import type { MetaDefinition } from '@angular/platform-browser';
import { RouterModule, type Routes } from '@angular/router';

import { TaskListComponent, TaskFormComponent } from './components';

const metaTags: Array<MetaDefinition> = [
  {
    name: 'description',
    content: 'Task Manager Application. This is SPA'
  },
  {
    name: 'keywords',
    content: 'Angular tutorial, SPA, Routing'
  }
];

const routes: Routes = [
  {
    path: 'home',
    component: TaskListComponent,
    title: 'Task Manager',
    data: {
      meta: metaTags
    }
  },
  {
    path: 'edit/:taskID',
    component: TaskFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {}
