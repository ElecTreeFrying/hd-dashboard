import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { OptionDialogComponent } from "../option-dialog/option-dialog.component";

import { AuthFirebaseService } from "../../../core/services/auth-firebase.service";
import { SharedService } from "../../../core/services/shared.service";


@Component({
  selector: 'app-doctor-auth-dialog',
  templateUrl: './doctor-auth-dialog.component.html',
  styleUrls: ['./doctor-auth-dialog.component.scss']
})
export class DoctorAuthDialogComponent implements OnInit {

  doctorAuthForm: FormGroup;
  optionDialogRef: MatDialogRef<OptionDialogComponent>;

  constructor(private router: Router, private route: ActivatedRoute, private doctorAuthDialogRef: MatDialogRef<DoctorAuthDialogComponent>, private authFirebaseService: AuthFirebaseService, private sharedService: SharedService) { }

  ngOnInit() {
    this.doctorAuthForm = new FormGroup({
      'email': new FormControl('da@d.com', [ Validators.required, Validators.email ]),
      'password': new FormControl('123123', [ Validators.required, Validators.minLength(6) ]),
      'number': new FormControl(''),
    });
  }

  onAuthenticate() {
    if (this.doctorAuthForm.invalid) return;

    const form = this.doctorAuthForm.value;
    const email = form['email'];
    const password = form['password'];
    const number = form['number'];

    this.authFirebaseService.signinDoctor(email, password)
      .then((res) => {
        this.sharedService.openSnackbar('Signed in successfully.', 3500);
        this.router.navigate(['doctor']);
        this.doctorAuthDialogRef.close();
      }).catch((e) => {
        console.log('ERROR: ', e);
        this.sharedService.openSnackbar(e, 3500);
        this.router.navigate(['/']);
      });
  }

}
