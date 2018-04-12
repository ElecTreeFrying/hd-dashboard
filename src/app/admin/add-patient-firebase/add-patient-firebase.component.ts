import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthFirebaseService } from "../../common/core/services/auth-firebase.service";

import { PatientDetails } from "../../common/shared/model/patient.model";


@Component({
  selector: 'app-add-patient-firebase',
  templateUrl: './add-patient-firebase.component.html',
  styleUrls: ['./add-patient-firebase.component.scss']
})
export class AddPatientFirebaseComponent implements OnInit {

  patientForm: FormGroup;
  namePattern: string = "^([ \u00c0-\u01ffa-zA-Z])+$";

  constructor(private authFirebaseService: AuthFirebaseService) { }

  ngOnInit() {
    this.patientForm = new FormGroup({
      'patientName': new FormControl(null, [ Validators.required, Validators.minLength(2), Validators.pattern(this.namePattern) ]),
      'patientEmail': new FormControl(null, [ Validators.required, Validators.email ]),
      'patientNumber': new FormControl(null, [ Validators.required ]),
      'patientPassword': new FormControl(null, [ Validators.required, Validators.minLength(6) ]),
    });
  }

  onAddPatient() {
    if (this.patientForm.invalid) return;

    const form = this.patientForm.value;
    const name = form['patientName'];
    const email = form['patientEmail'];
    const number = form['patientNumber'];
    const password = form['patientPassword'];

    const patientDetails = new PatientDetails('', name, email, number, password);

    this.authFirebaseService.createPatient(patientDetails)

    this.patientForm.reset();
  }

}
