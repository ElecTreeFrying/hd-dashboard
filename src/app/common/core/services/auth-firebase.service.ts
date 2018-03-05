import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs/Subscription';

import { DbFirebaseService } from "./db-firebase.service";
import { SharedService } from "./shared.service";

import { IPatientDetails } from "../../shared/interface/patient";
import { IDoctorDetails } from "../../shared/interface/doctor";
import { IAdminDetails } from "../../shared/interface/admin";


@Injectable()
export class AuthFirebaseService {

  constructor(private router: Router, private fb: AngularFireAuth, private dbFirebaseService: DbFirebaseService, private sharedService: SharedService) {
    this.fb.authState.subscribe((state) => {
      state !== null ? console.log(state) : null;
    });
  }

  get authenticated(): boolean {
    const authState = this.fb.auth.currentUser;
    return authState !== null;
  }

  get currentUserId(): string {
    const authState = this.fb.auth.currentUser;
    return this.authenticated ? authState['uid'] : '';
  }


  createAdmin(adminDetails: IAdminDetails) {
    this.fb.auth.createUserWithEmailAndPassword(adminDetails.adminEmail, adminDetails.adminPassword)
      .then((user) => {
        this.dbFirebaseService.createAdmin(adminDetails);
      }).catch((e) => {
        console.log('ERROR: ', e['message']);
        this.sharedService.openSnackbar(e['message'], 3500);
      })
  }

  createPatient(patientDetails: IPatientDetails) {
    this.fb.auth.createUserWithEmailAndPassword(patientDetails.patientEmail, patientDetails.patientPassword)
      .then((user) => {
        const uid = user.uid;
        patientDetails.patientUid = uid;
        this.dbFirebaseService.createPatient(patientDetails);
      }).catch((e) => {
        console.log('ERROR: ', e['message']);
        this.sharedService.openSnackbar(e['message'], 3500);
      })

  }

  createDoctor(doctorDetails: IDoctorDetails) {
    this.fb.auth.createUserWithEmailAndPassword(doctorDetails.doctorEmail, doctorDetails.doctorPassword)
      .then((user) => {
        const uid = user.uid;
        doctorDetails.doctorUid = uid;
        this.dbFirebaseService.createDoctor(doctorDetails);
      }).catch((e) => {
        console.log('ERROR: ', e['message']);
        this.sharedService.openSnackbar(e['message'], 3500);
      })
  }

  signinPatient(email: string, password: string) {
    return this.fb.auth.signInWithEmailAndPassword(email, password)
  }

  signinDoctor(email: string, password: string) {
    return this.fb.auth.signInWithEmailAndPassword(email, password)
  }

  signinAdmin(email: string, password: string) {
    return this.fb.auth.signInWithEmailAndPassword(email, password)
  }

  signOutUser() {
    this.fb.auth.signOut()
      .then(() => {
        const message = 'Signed out successfully.';
        this.sharedService.openSnackbar(message, 3500);
        this.router.navigate(['/']);
      }).catch((e) => {
        const message = 'Error occured please try again.';
        this.sharedService.openSnackbar(message, 3500);
      });
  }

}
