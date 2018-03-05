import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';

import { AdminRoutingModule } from './admin-routing.module';
import { Material2Module } from "../common/core/modules/material2.module";

import { AdminComponent } from './admin.component';
import { AddPatientDoctorComponent } from './add-patient-doctor/add-patient-doctor.component';
import { AddPatientFirebaseComponent } from './add-patient-firebase/add-patient-firebase.component';
import { AddDoctorFirebaseComponent } from './add-doctor-firebase/add-doctor-firebase.component';
import { AddDoctorPatientComponent } from './add-doctor-patient/add-doctor-patient.component';
import { AddAdminFirebaseComponent } from './add-admin-firebase/add-admin-firebase.component';
import { GenerateAccountNoComponent } from './generate-account-no/generate-account-no.component';
import { ListAccountsRegisteredComponent } from './list-accounts-registered/list-accounts-registered.component';
import { ListDetailsDialogComponent } from "../common/shared/components/list-details-dialog/list-details-dialog.component";
import { GenerateAccountDetailsComponent } from './generate-account-details/generate-account-details.component';
import { SearchUserDialogComponent } from "../common/shared/components/search-user-dialog/search-user-dialog.component";

import { AuthFirebaseService } from "../common/core/services/auth-firebase.service";
import { DbFirebaseService } from "../common/core/services/db-firebase.service";
import { DbFirebaseService0 } from "../common/core/services/db-firebase0.service";
import { DoctorListResolver } from "../common/core/services/doctor-list.resolver";
import { PatientListResolver } from "../common/core/services/patient-list.resolver";
import { AdminGuard } from "./admin.guard";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClipboardModule,
    AdminRoutingModule,
    Material2Module,
  ],
  declarations: [
    AdminComponent,
    AddPatientDoctorComponent,
    AddPatientFirebaseComponent,
    AddDoctorFirebaseComponent,
    AddDoctorPatientComponent,
    AddAdminFirebaseComponent,
    GenerateAccountNoComponent,
    ListAccountsRegisteredComponent,
    ListDetailsDialogComponent,
    GenerateAccountDetailsComponent,
    SearchUserDialogComponent,
  ],
  entryComponents: [
    ListDetailsDialogComponent,
    SearchUserDialogComponent,
  ],
  providers: [
    AuthFirebaseService,
    DbFirebaseService,
    DbFirebaseService0,
    PatientListResolver,
    DoctorListResolver,
    AdminGuard,
  ]
})
export class AdminModule { }
