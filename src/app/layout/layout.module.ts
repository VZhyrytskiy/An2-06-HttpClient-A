import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  AboutComponent,
  AbcComponent,
  LoginComponent,
  MessagesComponent,
  PathNotFoundComponent
} from './components';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ AboutComponent, AbcComponent, LoginComponent, MessagesComponent, PathNotFoundComponent]
})
export class LayoutModule {}
