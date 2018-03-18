import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppProviderModule } from "./app-provider.module";
import { Material2Module } from "./common/core/modules/material2.module";

import { AppComponent } from './app.component';
import { OptionDialogComponent } from "./common/shared/components/option-dialog/option-dialog.component";
import { PatientAuthDialogComponent } from "./common/shared/components/patient-auth-dialog/patient-auth-dialog.component";
import { DoctorAuthDialogComponent } from "./common/shared/components/doctor-auth-dialog/doctor-auth-dialog.component";
import { AdminAuthDialogComponent } from "./common/shared/components/admin-auth-dialog/admin-auth-dialog.component";

import { AuthFirebaseService } from "./common/core/services/auth-firebase.service";
import { DbFirebaseService } from "./common/core/services/db-firebase.service";
import { DbFirebaseService0 } from "./common/core/services/db-firebase0.service";
import { SharedService } from "./common/core/services/shared.service";


@NgModule({
  declarations: [
    AppComponent,
    OptionDialogComponent,
    PatientAuthDialogComponent,
    DoctorAuthDialogComponent,
    AdminAuthDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppProviderModule,
    Material2Module,
  ],
  entryComponents: [
    OptionDialogComponent,
    PatientAuthDialogComponent,
    DoctorAuthDialogComponent,
    AdminAuthDialogComponent,
  ],
  providers: [
    AuthFirebaseService,
    DbFirebaseService,
    DbFirebaseService0,
    SharedService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
