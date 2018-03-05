import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { AddRemarksDialogComponent } from "../common/shared/components/add-remarks-dialog/add-remarks-dialog.component";
import { PatientListDialogComponent } from "../common/shared/components/patient-list-dialog/patient-list-dialog.component";
import { AccountDetailsDialogComponent } from "../common/shared/components/account-details-dialog/account-details-dialog.component";


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  addRemarksDialogRef: MatDialogRef<AddRemarksDialogComponent>;
  patientListDialogRef: MatDialogRef<PatientListDialogComponent>;
  accountDetailsDialogRef: MatDialogRef<AccountDetailsDialogComponent>;

  constructor(private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
  }

  addRemarks() {
    const patients = this.route.snapshot.data[0];
    this.addRemarksDialogRef = this.dialog.open(AddRemarksDialogComponent, { data: patients });
  }

  showPatientList() {
    this.patientListDialogRef = this.dialog.open(PatientListDialogComponent);
  }

  accountDetails() {
    this.accountDetailsDialogRef = this.dialog.open(AccountDetailsDialogComponent, { data: false });
  }

}
