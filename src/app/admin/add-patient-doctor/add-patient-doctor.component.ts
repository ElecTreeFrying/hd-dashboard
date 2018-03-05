import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import { DbFirebaseService } from "../../common/core/services/db-firebase.service";


@Component({
  selector: 'app-add-patient-doctor',
  templateUrl: './add-patient-doctor.component.html',
  styleUrls: ['./add-patient-doctor.component.scss']
})
export class AddPatientDoctorComponent implements OnInit {

  patientForm: FormGroup;

  reactivePatient: any;
  reactiveDoctor: any;

  patients: any;
  doctors: any;

  constructor(private route: ActivatedRoute, private dbFirebaseService: DbFirebaseService) { }

  ngOnInit() {
    this.patientForm = new FormGroup({
      'patientNumber': new FormControl(null, [ Validators.required ]),
      'doctorNumber': new FormControl(null, [ Validators.required ]),
    });

    this.patients = this.route.snapshot.data[0];
    this.doctors = this.route.snapshot.data[1]

    this.reactivePatient = this.patientForm.get('patientNumber').valueChanges
      .pipe(
        startWith(this.patientForm.get('patientNumber').value),
        map(val => this.displayFnPatient(val)),
        map(name => this.filterPatients(name))
      );

    this.reactiveDoctor = this.patientForm.get('doctorNumber').valueChanges
      .pipe(
        startWith(this.patientForm.get('doctorNumber').value),
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

  onAddPatient() {
    if (this.patientForm.invalid) return;

    const form = this.patientForm.value;
    const patientNumber = form['patientNumber'];
    const doctorNumber = form['doctorNumber'];

    this.dbFirebaseService.addPatientToDoctor(patientNumber, doctorNumber);

    this.patientForm.reset();
  }

}
