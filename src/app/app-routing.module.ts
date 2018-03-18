import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'doctor', loadChildren: './doctor/doctor.module#DoctorModule' },
  { path: 'patient', loadChildren: './patient/patient.module#PatientModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'ignore' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
