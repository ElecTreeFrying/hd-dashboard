import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthFirebaseService } from "../../common/core/services/auth-firebase.service";

import { AdminDetails } from "../../common/shared/model/admin.model";


@Component({
  selector: 'app-add-admin-firebase',
  templateUrl: './add-admin-firebase.component.html',
  styleUrls: ['./add-admin-firebase.component.scss']
})
export class AddAdminFirebaseComponent implements OnInit {

  adminAuthForm: FormGroup;

  constructor(private authFirebaseService: AuthFirebaseService) { }

  ngOnInit() {
    this.adminAuthForm = new FormGroup({
      'email': new FormControl(null, [ Validators.required, Validators.email ]),
      'password': new FormControl(null, [ Validators.required, Validators.minLength(6) ]),
    });
  }

  onAddAdmin() {
    if (this.adminAuthForm.invalid) return;

    const form = this.adminAuthForm.value;
    const email = form['email'];
    const password = form['password'];

    const adminDetails = new AdminDetails(email, password);

    this.authFirebaseService.createAdmin(adminDetails);

    this.adminAuthForm.reset();
  }

}
