import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DoctorRoutingModule } from './doctor-routing.module';
import { Material2Module } from "../common/core/modules/material2.module";

import { DoctorComponent } from './doctor.component';
import { AddRemarksDialogComponent } from "../common/shared/components/add-remarks-dialog/add-remarks-dialog.component";
import { PatientListDialogComponent } from "../common/shared/components/patient-list-dialog/patient-list-dialog.component";
import { AccountDetailsDialogComponent } from "../common/shared/components/account-details-dialog/account-details-dialog.component";
import { SetTimeDialogComponent } from "../common/shared/components/set-time-dialog/set-time-dialog.component";

import { DoctorGuard } from "./doctor.guard";
import { AuthFirebaseService } from "../common/core/services/auth-firebase.service";
import { SharedService } from "../common/core/services/shared.service";
import { DbFirebaseService0 } from "../common/core/services/db-firebase0.service";
import { DoctorsPatientsResolver } from "../common/core/services/doctors-patients.resolver";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Material2Module,
    DoctorRoutingModule,
  ],
  declarations: [
    DoctorComponent,
    AddRemarksDialogComponent,
    PatientListDialogComponent,
    AccountDetailsDialogComponent,
    SetTimeDialogComponent,
  ],
  entryComponents: [
    AddRemarksDialogComponent,
    PatientListDialogComponent,
    AccountDetailsDialogComponent,
    SetTimeDialogComponent,
  ],
  providers: [
    DoctorGuard,
    AuthFirebaseService,
    SharedService,
    DbFirebaseService0,
    DoctorsPatientsResolver
  ]
})
export class DoctorModule { }
