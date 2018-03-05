import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorComponent } from "./doctor.component";

import { DoctorGuard } from "./doctor.guard";

import { DoctorsPatientsResolver } from "../common/core/services/doctors-patients.resolver";

const routes: Routes = [
  { path: '', component: DoctorComponent, canActivateChild: [ DoctorGuard ], resolve: [ DoctorsPatientsResolver ], children: [
    { path: '', loadChildren: './dashboardDoctor/dashboard.module#DashboardModuleDoctor' },
  ] }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
