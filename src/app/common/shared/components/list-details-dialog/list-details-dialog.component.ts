import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { DbFirebaseService0 } from "../../../core/services/db-firebase0.service";


@Component({
  selector: 'app-list-details-dialog',
  templateUrl: './list-details-dialog.component.html',
  styleUrls: ['./list-details-dialog.component.scss']
})
export class ListDetailsDialogComponent implements OnInit {

  option: boolean = false;
  patient: any;
  doctor: any;
  patients: any;
  doctors: any;
  patientsIsEmpty: boolean = false;
  doctorsIsEmpty: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dbFirebaseService: DbFirebaseService0) { }

  ngOnInit() {
    this.option = this.data.option;

    if (this.option) {
      this.patient = this.data.data;
      this.doctors = this.dbFirebaseService.getPatientsDoctors(this.patient.patientUid);
    } else {
      this.doctor = this.data.data;
      this.patients = this.dbFirebaseService.getDoctorsPatients(this.doctor.doctorUid);
    }
  }

}
