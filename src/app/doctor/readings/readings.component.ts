import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import * as Chart from 'chart.js';

import { SetTimeDialogComponent } from "../../common/shared/components/set-time-dialog/set-time-dialog.component";

import { DbFirebaseService } from "../../common/core/services/db-firebase.service";
import { DbFirebaseService0 } from "../../common/core/services/db-firebase0.service";
import { AuthFirebaseService } from "../../common/core/services/auth-firebase.service";
import { SharedService } from "../../common/core/services/shared.service";


@Component({
  selector: 'app-readings',
  templateUrl: './readings.component.html',
  styleUrls: ['./readings.component.scss']
})
export class ReadingsComponent implements OnInit {

  @ViewChild('myChart') myChart: ElementRef;

  settimeDialogRef: MatDialogRef<SetTimeDialogComponent>;
  patientDetails: Observable<any>;
  patientReading: any;

  reference: AngularFireList<any>;

  constructor(private dialog: MatDialog, private db: AngularFireDatabase, private dbFirebaseService: DbFirebaseService, private dbFirebaseService0: DbFirebaseService0, private sharedService: SharedService, private authFirebaseService: AuthFirebaseService) { }

  ngOnInit() {
    const currentUserId = this.authFirebaseService.currentUserId;

    this.dbFirebaseService.doctorDetailsRef.valueChanges().subscribe((response: any) => {
      response.forEach((el, i) => {
        if (el.doctorUid === currentUserId) {
          this.reference = this.db.list<any>(`doctor-list-PATIENTS/${el.doctorUid}`);
          this.patientDetails = this.reference.valueChanges();
        }
      });
    });

    this.sharedService.data();
  }

  onExpandPanel(patientNo: string) {
    this.dbFirebaseService0.getPatientReadings.subscribe((response) => {

      response.map((el) => {

        const blank = {};
        const newData = el.split(' ');

        newData.forEach((el) => {
          const newEl = el.split('/');
          blank[newEl[0]] = newEl[1];
        })

        if (blank['patientNo'] === patientNo) {
          return blank;
          // this.patientReading = blank;
        }
      }).filter(el => el !== undefined)

      response.forEach((el) => {

        const blank = {};
        const newData = el.split(' ');

        newData.forEach((el) => {
          const newEl = el.split('/');
          blank[newEl[0]] = newEl[1];
        })

        if (blank['patientNo'] === patientNo) {
          this.patientReading = blank;
        }
      })
    });
  }

  onSetime(patient) {
    this.dialog.open(SetTimeDialogComponent, { data: patient });
  }

}
