import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Material2Module } from "../../common/core/modules/material2.module";

import { ManualRoutingModule } from './manual-routing.module';
import { ManualComponent } from './manual.component';

@NgModule({
  imports: [
    CommonModule,
    ManualRoutingModule,
    Material2Module,
  ],
  declarations: [ManualComponent]
})
export class ManualModule { }
