import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { Material2Module } from "../../common/core/modules/material2.module";

import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    Material2Module,
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
