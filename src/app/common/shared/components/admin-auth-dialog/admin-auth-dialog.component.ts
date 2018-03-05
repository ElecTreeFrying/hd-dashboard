import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { OptionDialogComponent } from "../option-dialog/option-dialog.component";

import { AuthFirebaseService } from "../../../core/services/auth-firebase.service";
import { SharedService } from "../../../core/services/shared.service";


@Component({
  selector: 'app-admin-auth-dialog',
  templateUrl: './admin-auth-dialog.component.html',
  styleUrls: ['./admin-auth-dialog.component.scss']
})
export class AdminAuthDialogComponent implements OnInit {

  adminAuthForm: FormGroup;
  optionDialogRef: MatDialogRef<OptionDialogComponent>;

  constructor(private router: Router, private route: ActivatedRoute, private adminAuthDialogRef: MatDialogRef<AdminAuthDialogComponent>, private authFirebaseService: AuthFirebaseService, private sharedService: SharedService) { }

  ngOnInit() {
    this.adminAuthForm = new FormGroup({
      'email': new FormControl('a@a.com', [ Validators.required, Validators.email ]),
      'password': new FormControl('adminz', [ Validators.required, Validators.minLength(6) ]),
      'number': new FormControl(null),
    });
  }

  onAuthenticate() {
    if (this.adminAuthForm.invalid) return;

    const form = this.adminAuthForm.value;
    const email = form['email'];
    const password = form['password'];
    const number = form['number'];

    this.authFirebaseService.signinAdmin(email, password)
      .then((res) => {
        this.sharedService.openSnackbar('Signed in successfully.', 3500);
        this.router.navigate(['admin']);
        this.adminAuthDialogRef.close();
      }).catch((e) => {
        console.log('ERROR: ', e);
        this.sharedService.openSnackbar(e, 3500);
        this.router.navigate(['/']);
      });
  }

}
