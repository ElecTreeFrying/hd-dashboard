import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { OptionDialogComponent } from "../option-dialog/option-dialog.component";

import { AuthFirebaseService } from "../../../core/services/auth-firebase.service";
import { SharedService } from "../../../core/services/shared.service";


@Component({
  selector: 'app-patient-auth-dialog',
  templateUrl: './patient-auth-dialog.component.html',
  styleUrls: ['./patient-auth-dialog.component.scss']
})
export class PatientAuthDialogComponent implements OnInit {

  parentAuthForm: FormGroup;
  optionDialogRef: MatDialogRef<OptionDialogComponent>;

  constructor(private router: Router, private route: ActivatedRoute, private patientAuthDialogRef: MatDialogRef<PatientAuthDialogComponent>, private authFirebaseService: AuthFirebaseService, private sharedService: SharedService) { }

  ngOnInit() {
    this.parentAuthForm = new FormGroup({
      'email': new FormControl('pa@p.com', [ Validators.required, Validators.email ]),
      'password': new FormControl('123123', [ Validators.required, Validators.minLength(6) ]),
      'number': new FormControl(''),
    });
  }

  onAuthenticate() {
    if (this.parentAuthForm.invalid) return;

    const form = this.parentAuthForm.value;
    const email = form['email'];
    const password = form['password'];
    const number = form['number'];

    this.authFirebaseService.signinPatient(email, password)
      .then((res) => {
        this.sharedService.openSnackbar('Signed in successfully.', 3500);
        this.router.navigate(['patient']);
        this.patientAuthDialogRef.close();
      }).catch((e) => {
        console.log('ERROR: ', e);
        this.sharedService.openSnackbar(e, 3500);
        this.router.navigate(['/']);
      });
  }

}
