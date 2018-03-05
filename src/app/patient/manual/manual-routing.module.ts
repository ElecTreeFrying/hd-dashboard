import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManualComponent } from "./manual.component";

const routes: Routes = [
  { path: '', component: ManualComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManualRoutingModule { }
