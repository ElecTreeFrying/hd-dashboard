import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { Material2Module } from "../../common/core/modules/material2.module";

import { MessagesComponent } from "./messages.component";
import { DoctorsRemarksDialogComponent } from '../../common/shared/components/doctors-remarks-dialog/doctors-remarks-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MessagesRoutingModule,
    Material2Module,
  ],
  declarations: [
    MessagesComponent,
    DoctorsRemarksDialogComponent
  ],
  entryComponents: [
    DoctorsRemarksDialogComponent
  ]
})
export class MessagesModule { }
