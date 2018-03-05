import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from "./admin.component";

import { AdminGuard } from "./admin.guard";
import { PatientListResolver } from "../common/core/services/patient-list.resolver";
import { DoctorListResolver } from "../common/core/services/doctor-list.resolver";


const routes: Routes = [
  { path: '', component: AdminComponent, canActivate: [ AdminGuard ], resolve: [ PatientListResolver, DoctorListResolver ] }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
