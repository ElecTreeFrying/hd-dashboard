import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';

import { DbFirebaseService0 } from "../../../core/services/db-firebase0.service";
import { SharedService } from "../../../core/services/shared.service";


@Component({
  selector: 'app-search-user-dialog',
  templateUrl: './search-user-dialog.component.html',
  styleUrls: ['./search-user-dialog.component.scss']
})
export class SearchUserDialogComponent implements OnInit {

  patientControl: FormControl;
  doctorControl: FormControl;

  reactivePatientList: any;
  reactiveDoctorList: any;

  patientList: any;
  doctorList: any;

  patient: any;
  doctor: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dbFirebaseService: DbFirebaseService0, private sharedService: SharedService) { }

  ngOnInit() {
    this.patientList = this.data.list[0];
    this.doctorList = this.data.list[1];

    this.patientControl = new FormControl('');
    this.doctorControl = new FormControl('');

    this.reactivePatientList = this.patientControl.valueChanges
      .pipe(
        startWith(this.patientControl.value),
        map(val => this.displayFnPatient(val)),
        map(name => this.filterPatients(name))
      );

    this.reactiveDoctorList = this.doctorControl.valueChanges
      .pipe(
        startWith(this.doctorControl.value),
        map(val => this.displayFnDoctor(val)),
        map(name => this.filterDoctors(name))
      );

  }

  onChange(event: any, option: boolean) {
    const patientValue = this.patientControl.value;
    const doctorValue = this.doctorControl.value;

    if (option) {
      this.patient = patientValue;
    } else {
      this.doctor = doctorValue;
    }
  }

  onClipboard(option: boolean, value: any) {
    if (option) {
      const message = `${value} copied to clipboard`;
      this.sharedService.openSnackbar(message, 3500);
    } else {
      const message = `${value} copied to clipboard`;
      this.sharedService.openSnackbar(message, 3500);
    }
  }

  displayFnPatient(value: any): string {
    return value && typeof value === 'object' ? value.patientName : value;
  }

  displayFnDoctor(value: any): string {
    return value && typeof value === 'object' ? value.doctorName : value;
  }

  filterPatients(val: string) {
    return val ? this._filter(this.patientList, val, true) : this.patientList;
  }

  filterDoctors(val: string) {
    return val ? this._filter(this.doctorList, val, false) : this.doctorList;
  }

  private _filter(users: any, val: string, option: boolean) {
    const filterValue = val.toLowerCase();

    if (option) {
      return users.filter(user => user.patientName.toLowerCase().startsWith(filterValue));
    } else {
      return users.filter(user => user.doctorName.toLowerCase().startsWith(filterValue));
    }
  }

}
