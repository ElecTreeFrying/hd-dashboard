import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import { DbFirebaseService } from "../../common/core/services/db-firebase.service";


@Component({
  selector: 'app-add-doctor-patient',
  templateUrl: './add-doctor-patient.component.html',
  styleUrls: ['./add-doctor-patient.component.scss']
})
export class AddDoctorPatientComponent implements OnInit {

  doctorForm: FormGroup;
  namePattern: string = "^([ \u00c0-\u01ffa-zA-Z])+$";

  reactivePatient: any;
  reactiveDoctor: any;

  patients: any;
  doctors: any;

  constructor(private route: ActivatedRoute, private dbFirebaseService: DbFirebaseService) { }

  ngOnInit() {
    this.doctorForm = new FormGroup({
      'patientNumber': new FormControl(null, [ Validators.required ]),
      'doctorNumber': new FormControl(null, [ Validators.required, Validators.minLength(2), Validators.pattern(this.namePattern) ]),
    });

    this.patients = this.route.snapshot.data[0];
    this.doctors = this.route.snapshot.data[1]

    this.reactivePatient = this.doctorForm.get('patientNumber').valueChanges
      .pipe(
        startWith(this.doctorForm.get('patientNumber').value),
        map(val => this.displayFnPatient(val)),
        map(name => this.filterPatients(name))
      );

    this.reactiveDoctor = this.doctorForm.get('doctorNumber').valueChanges
      .pipe(
        startWith(this.doctorForm.get('doctorNumber').value),
        map(val => this.displayFnDoctor(val)),
        map(name => this.filterDoctors(name))
      );
  }

  displayFnPatient(value: any): string {
    return value && typeof value === 'object' ? value.patientName : value;
  }

  displayFnDoctor(value: any): string {
    return value && typeof value === 'object' ? value.doctorName : value;
  }

  filterPatients(val: string) {
    return val ? this._filter(this.patients, val) : this.patients;
  }

  filterDoctors(val: string) {
    return val ? this._filterD(this.doctors, val) : this.doctors;
  }

  private _filter(users: any, val: string) {
    const filterValue = val.toLowerCase();
    return users.filter(user => user.patientName.toLowerCase().startsWith(filterValue));
  }

  private _filterD(users: any, val: string) {
    const filterValue = val.toLowerCase();
    return users.filter(user => user.doctorName.toLowerCase().startsWith(filterValue));
  }

  onAddDoctor() {
    if (this.doctorForm.invalid) return;

    const form = this.doctorForm.value;
    const doctorName = form['doctorNumber'];
    const patientNumber = form['patientNumber'];

    this.dbFirebaseService.addDoctorToPatient(doctorName, patientNumber);
  }

}
