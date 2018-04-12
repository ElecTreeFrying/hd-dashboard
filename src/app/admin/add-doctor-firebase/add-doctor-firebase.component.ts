import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthFirebaseService } from "../../common/core/services/auth-firebase.service";

import { DoctorDetails } from "../../common/shared/model/doctor.model";


@Component({
  selector: 'app-add-doctor-firebase',
  templateUrl: './add-doctor-firebase.component.html',
  styleUrls: ['./add-doctor-firebase.component.scss']
})
export class AddDoctorFirebaseComponent implements OnInit {

  doctorForm: FormGroup;
  namePattern: string = "^([ \u00c0-\u01ffa-zA-Z])+$";

  constructor(private authFirebaseService: AuthFirebaseService) { }

  ngOnInit() {
    this.doctorForm = new FormGroup({
      'doctorName': new FormControl(null, [ Validators.required, Validators.minLength(2), Validators.pattern(this.namePattern) ]),
      'doctorEmail': new FormControl(null, [ Validators.required, Validators.email ]),
      'doctorNumber': new FormControl(null, [ Validators.required ]),
      'doctorPassword': new FormControl(null, [ Validators.required, Validators.minLength(6) ]),
    });
  }

  onAddDoctor() {
    if (this.doctorForm.invalid) return;

    const form = this.doctorForm.value;
    const name = form['doctorName'];
    const email = form['doctorEmail'];
    const number = form['doctorNumber'];
    const password = form['doctorPassword'];

    const doctorDetails = new DoctorDetails('', name, email, number, password);

    this.authFirebaseService.createDoctor(doctorDetails)

    this.doctorForm.reset();
  }
}
