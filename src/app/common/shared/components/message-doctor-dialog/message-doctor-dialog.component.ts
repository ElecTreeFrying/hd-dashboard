import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import * as moment from 'moment';

import { DbFirebaseService } from "../../../core/services/db-firebase.service";

import { PatientRemarks } from "../../model/doctor.model";
import { AuthFirebaseService } from "../../../core/services/auth-firebase.service";


@Component({
  selector: 'app-message-doctor-dialog',
  templateUrl: './message-doctor-dialog.component.html',
  styleUrls: ['./message-doctor-dialog.component.scss']
})
export class MessageDoctorDialogComponent implements OnInit {

  remarksForm: FormGroup;

  reactiveDoctor: any;

  doctors: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private dbFirebaseService: DbFirebaseService, private authFirebaseService: AuthFirebaseService) { }

  ngOnInit() {
    let name = '';
    let number = '';

    this.dbFirebaseService.getPatientsDoctorsDetails(this.data).subscribe((response: any) => {
      name = response[0].doctorName;
      number = response[0].doctorNumber;
      this.remarksForm.patchValue({
        'doctornumber': `${name} (${number})`
      })

      this.doctors = response;
    });

    this.remarksForm = new FormGroup({
      'doctornumber': new FormControl(null, [Validators.required]),
      'remarks': new FormControl(null, [Validators.required])
    });

    this.reactiveDoctor = this.remarksForm.get('doctornumber').valueChanges
      .pipe(
        startWith(this.remarksForm.get('doctornumber').value),
        map(val => this.displayFnDoctor(val)),
        map(name => this.filterDoctors(name))
      );
  }

  displayFnDoctor(value: any): string {
    return value && typeof value === 'object' ? value.doctorName : value;
  }

  filterDoctors(val: string) {
    return val ? this._filter(this.doctors, val) : this.doctors;
  }

  private _filter(users: any, val: string) {
    const filterValue = val.toLowerCase();
    return users.filter(user => user.doctorName.toLowerCase().startsWith(filterValue));
  }

  clearField() {
    this.remarksForm.reset();
  }

  onAddRemarks() {
    if (this.remarksForm.invalid) return;

    const form = this.remarksForm.value;
    const message = form['remarks'];
    let doctorno = form['doctornumber'];

    const timestamp = moment().format('llll');;

    const patientUid = this.authFirebaseService.currentUserId;

    const index = doctorno.indexOf('DX');
    const exclude = doctorno.indexOf(')');
    doctorno = doctorno.substr(index, 15);

    this.dbFirebaseService.getPatientName(patientUid)
      .then((patientName: string) => {
        const remark = new PatientRemarks(doctorno, message, patientName, timestamp);
        this.dbFirebaseService.addPatientMessageToDoctor(remark);
      });

    this.dialog.closeAll();
  }

}
