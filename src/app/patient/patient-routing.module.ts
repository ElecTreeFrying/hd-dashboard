import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientComponent } from "./patient.component";

import { PatientGuard } from "./patient.guard";
import { PageResolver } from "./page/page.resolver";
import { RemarksResolver } from "./remarks/remarks.resolver";

const routes: Routes = [
  { path: '', component: PatientComponent, canActivateChild: [ PatientGuard ], children: [
    { path: '', loadChildren: './page/page.module#PageModule', resolve: [ PageResolver ] },
    { path: 'vital-signs', loadChildren: './page/page.module#PageModule', resolve: [ PageResolver ] },
    { path: 'doctors-remarks', loadChildren: './remarks/remarks.module#RemarksModule', resolve: [ RemarksResolver ] },
    { path: 'user-manual', loadChildren: './manual/manual.module#ManualModule' },
  ] },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
