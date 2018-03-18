import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { Material2Module } from "../../common/core/modules/material2.module";

import { MessagesComponent } from "./messages.component";

@NgModule({
  imports: [
    CommonModule,
    MessagesRoutingModule,
    Material2Module,
  ],
  declarations: [
    MessagesComponent,
  ]
})
export class MessagesModule { }
