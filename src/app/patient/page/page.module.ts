import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Material2Module } from "../../common/core/modules/material2.module";

import { PageRoutingModule } from './page-routing.module';
import { HardwareIssuesDialogComponent } from "../../common/shared/components/hardware-issues-dialog/hardware-issues-dialog.component";
import { MessageDoctorDialogComponent } from "../../common/shared/components/message-doctor-dialog/message-doctor-dialog.component";
import { PageComponent } from './page.component';

import { DbFirebaseService0 } from "../../common/core/services/db-firebase0.service";


@NgModule({
  imports: [
    CommonModule,
    PageRoutingModule,
    Material2Module,
  ],
  declarations: [
    PageComponent,
    HardwareIssuesDialogComponent,
    MessageDoctorDialogComponent,
  ],
  entryComponents: [
    HardwareIssuesDialogComponent,
    MessageDoctorDialogComponent,
  ],
  providers: [
    DbFirebaseService0
  ]
})
export class PageModule { }
