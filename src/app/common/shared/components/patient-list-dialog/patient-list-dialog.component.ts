import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DbFirebaseService0 } from "../../../core/services/db-firebase0.service";
import { AuthFirebaseService } from "../../../core/services/auth-firebase.service";

import { SetTimeDialogComponent } from "../set-time-dialog/set-time-dialog.component";


@Component({
  selector: 'app-patient-list-dialog',
  templateUrl: './patient-list-dialog.component.html',
  styleUrls: ['./patient-list-dialog.component.scss']
})
export class PatientListDialogComponent implements OnInit {

  patients: any;

  constructor(private dialog: MatDialog, private dbFirebaseService: DbFirebaseService0, private authFirebaseService: AuthFirebaseService) { }

  ngOnInit() {
    const currentUserId = this.authFirebaseService.currentUserId;
    this.patients = this.dbFirebaseService.getDoctorsPatients(currentUserId);
  }

  onSetime(patient) {
    this.dialog.open(SetTimeDialogComponent, { data: patient });
  }

}
