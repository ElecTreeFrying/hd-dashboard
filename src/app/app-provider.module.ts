import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgModule } from '@angular/core';
import 'hammerjs';

import { environment } from '../environments/environment';

const firebaseConfig = environment.firebaseConfig;


@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  declarations: [],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ]
})
export class AppProviderModule { }
