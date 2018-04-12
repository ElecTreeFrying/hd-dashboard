import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgStringPipesModule } from 'ngx-pipes';

import { RemarksRoutingModule } from './remarks-routing.module';
import { Material2Module } from "../../common/core/modules/material2.module";

import { RemarksComponent } from './remarks.component';


@NgModule({
  imports: [
    CommonModule,
    NgStringPipesModule,
    RemarksRoutingModule,
    Material2Module,
  ],
  declarations: [
    RemarksComponent,
  ],
})
export class RemarksModule { }
