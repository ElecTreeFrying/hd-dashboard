import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgStringPipesModule } from 'ngx-pipes';

import { RemarksRoutingModule } from './remarks-routing.module';
import { Material2Module } from "../../common/core/modules/material2.module";

import { RemarksComponent } from './remarks.component';
import { DoctorsRemarksDialogComponent } from "../../common/shared/components/doctors-remarks-dialog/doctors-remarks-dialog.component";


@NgModule({
  imports: [
    CommonModule,
    NgStringPipesModule,
    RemarksRoutingModule,
    Material2Module,
  ],
  declarations: [
    RemarksComponent,
    DoctorsRemarksDialogComponent,
  ],
  entryComponents: [
    DoctorsRemarksDialogComponent
  ]
})
export class RemarksModule { }
