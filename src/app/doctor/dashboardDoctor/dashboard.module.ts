import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgStringPipesModule } from 'ngx-pipes';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { Material2Module } from "../../common/core/modules/material2.module";

import { DashboardComponent } from './dashboard.component';

import { DashboardResolver } from "./dashboard.resolver";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgStringPipesModule,
    Material2Module,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent,
  ],
  providers: [
    DashboardResolver
  ]
})
export class DashboardModuleDoctor { }
