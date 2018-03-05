import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { AuthFirebaseService } from "../../../core/services/auth-firebase.service";
import { DbFirebaseService0 } from "../../../core/services/db-firebase0.service";


@Component({
  selector: 'app-account-details-dialog',
  templateUrl: './account-details-dialog.component.html',
  styleUrls: ['./account-details-dialog.component.scss']
})
export class AccountDetailsDialogComponent implements OnInit {

  doctorDetails: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authFirebaseService: AuthFirebaseService, private dbFirebaseService: DbFirebaseService0) { }

  ngOnInit() {
    const currentUserId = this.authFirebaseService.currentUserId;
    this.doctorDetails = this.dbFirebaseService.getDoctorDetails(currentUserId);
  }

}
