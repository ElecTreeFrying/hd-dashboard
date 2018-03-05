import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Material2Module } from "../../common/core/modules/material2.module";

import { PageRoutingModule } from './page-routing.module';
import { PageComponent } from './page.component';

@NgModule({
  imports: [
    CommonModule,
    PageRoutingModule,
    Material2Module,
  ],
  declarations: [PageComponent]
})
export class PageModule { }
