import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import * as moment from 'moment';

import { DbFirebaseService } from "../../../core/services/db-firebase.service";

import { DoctorRemarks } from "../../model/doctor.model";
import { AuthFirebaseService } from "../../../core/services/auth-firebase.service";


@Component({
  selector: 'app-add-remarks-dialog',
  templateUrl: './add-remarks-dialog.component.html',
  styleUrls: ['./add-remarks-dialog.component.scss']
})
export class AddRemarksDialogComponent implements OnInit {

  remarksForm: FormGroup;

  reactivePatient: any;

  patients: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private dbFirebaseService: DbFirebaseService, private authFirebaseService: AuthFirebaseService) { }

  ngOnInit() {
    const name = this.data[0].patientName;
    const number = this.data[0].patientNumber;
    this.remarksForm = new FormGroup({
      'patientnumber': new FormControl(`${name} (${number})`, [Validators.required]),
      'remarks': new FormControl(null, [Validators.required])
    });

    this.patients = this.data;

    this.reactivePatient = this.remarksForm.get('patientnumber').valueChanges
      .pipe(
        startWith(this.remarksForm.get('patientnumber').value),
        map(val => this.displayFnPatient(val)),
        map(name => this.filterPatients(name))
      );
  }

  displayFnPatient(value: any): string {
    return value && typeof value === 'object' ? value.patientName : value;
  }

  filterPatients(val: string) {
    return val ? this._filter(this.patients, val) : this.patients;
  }

  private _filter(users: any, val: string) {
    const filterValue = val.toLowerCase();
    return users.filter(user => user.patientName.toLowerCase().startsWith(filterValue));
  }

  clearField() {
    this.remarksForm.reset();
  }

  onAddRemarks() {
    if (this.remarksForm.invalid) return;

    const form = this.remarksForm.value;
    const patientno = form['patientnumber'];
    const message = form['remarks'];

    const timestamp = moment().format('llll');;

    const doctorUid = this.authFirebaseService.currentUserId;

    this.dbFirebaseService.getDoctorName(doctorUid)
      .then((doctorName: string) => {
        const remark = new DoctorRemarks(patientno, message, doctorName, timestamp);
        this.dbFirebaseService.addRemarks(remark);
      });

    this.dialog.closeAll();
  }

}
