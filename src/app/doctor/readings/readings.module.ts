import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ReadingsRoutingModule } from './readings-routing.module';
import { Material2Module } from "../../common/core/modules/material2.module";

import { ReadingsComponent } from "./readings.component";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Material2Module,
    ReadingsRoutingModule,
  ],
  declarations: [
    ReadingsComponent,
  ]
})
export class ReadingsModule { }
