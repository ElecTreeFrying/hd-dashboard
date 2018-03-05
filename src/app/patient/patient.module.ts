import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { Material2Module } from "../common/core/modules/material2.module";

import { PatientComponent } from './patient.component';

import { PatientGuard } from "./patient.guard";
import { PageResolver } from "./page/page.resolver";
import { RemarksResolver } from "./remarks/remarks.resolver";
import { AuthFirebaseService } from "../common/core/services/auth-firebase.service";


@NgModule({
  imports: [
    CommonModule,
    PatientRoutingModule,
    Material2Module,
  ],
  declarations: [
    PatientComponent,
  ],
  providers: [
    PatientGuard,
    PageResolver,
    RemarksResolver,
    AuthFirebaseService
  ]
})
export class PatientModule { }
