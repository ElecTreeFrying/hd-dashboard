import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { PatientAuthDialogComponent } from "../patient-auth-dialog/patient-auth-dialog.component";
import { DoctorAuthDialogComponent } from "../doctor-auth-dialog/doctor-auth-dialog.component";
import { AdminAuthDialogComponent } from "../admin-auth-dialog/admin-auth-dialog.component";

import { SharedService } from "../../../core/services/shared.service";


@Component({
  selector: 'app-option-dialog',
  templateUrl: './option-dialog.component.html',
  styleUrls: ['./option-dialog.component.scss']
})
export class OptionDialogComponent implements OnInit {

  patientAuthDialogRef: MatDialogRef<PatientAuthDialogComponent>;
  doctorAuthDialogRef: MatDialogRef<DoctorAuthDialogComponent>;
  adminAuthDialogRef: MatDialogRef<AdminAuthDialogComponent>;

  constructor(private dialog: MatDialog, private optionDialogRef: MatDialogRef<OptionDialogComponent>, private sharedService: SharedService) { }

  ngOnInit() {
    this.optionDialogRef.backdropClick().subscribe(() => {
      const message = 'Select one to continue.';
      const duration = 3500;
      this.sharedService.openSnackbar(message, duration)
    });
  }

  openModule(data: boolean) {
    this.optionDialogRef.close();

    if (data) {
      this.patientAuthDialogRef = this.dialog.open(PatientAuthDialogComponent)
      this.patientAuthDialogRef.backdropClick().subscribe(() => {
        this.optionDialogRef = this.dialog.open(OptionDialogComponent, { disableClose: true });
      });
    } else {
      this.doctorAuthDialogRef = this.dialog.open(DoctorAuthDialogComponent)
      this.doctorAuthDialogRef.backdropClick().subscribe(() => {
        this.optionDialogRef = this.dialog.open(OptionDialogComponent, { disableClose: true });
      });
    }
  }

  openAdmin() {
    this.optionDialogRef.close();

    this.adminAuthDialogRef = this.dialog.open(AdminAuthDialogComponent);
    this.adminAuthDialogRef.backdropClick().subscribe(() => {
      this.optionDialogRef = this.dialog.open(OptionDialogComponent, { disableClose: true });
    });
  }

}
