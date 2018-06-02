import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import * as firebase from 'firebase';

import { IDoctorsRemarks, IPatientRemarks, ISettime } from "../../shared/interface/doctor";
import { IPatientDetails } from "../../shared/interface/patient";
import { IDoctorDetails } from "../../shared/interface/doctor";
import { IAdminDetails } from "../../shared/interface/admin";

import { SharedService } from "./shared.service";


@Injectable()
export class DbFirebaseService {

  reference: AngularFireList<any>;
  addRemarkRef: AngularFireList<any>;
  addPatientRemarkRef: AngularFireList<any>;
  patientDetailsRef: AngularFireList<any>;
  doctorDetailsRef: AngularFireList<any>;
  adminDetailsRef: AngularFireList<any>;

  constructor(private fb: AngularFireAuth, private db: AngularFireDatabase, private sharedService: SharedService) {
    this.addRemarkRef = this.db.list<any>('doctors-remarks');
    this.addPatientRemarkRef = this.db.list<any>('patients-remarks');
    this.patientDetailsRef = this.db.list<any>('patient-list-DETAILS');
    this.doctorDetailsRef = this.db.list<any>('doctor-list-DETAILS');
    this.adminDetailsRef = this.db.list<any>('admin-list-DETAILS');
  }

  createAdmin(adminDetails: IAdminDetails) {
    this.adminDetailsRef.push(adminDetails);
  }

  createPatient(patientDetails: IPatientDetails) {
    this.patientDetailsRef.push(patientDetails);
  }

  createDoctor(doctorDetails: IDoctorDetails) {
    this.doctorDetailsRef.push(doctorDetails);
  }

  addDoctorToPatient(doctorName: string, patientNumber: string) {
    const promise = new Promise(
      (resolve, reject) => {
        this.patientDetailsRef.valueChanges().subscribe((response: any) => {
          response.filter((el) => el.patientNumber === patientNumber).length === 0 ? this.sharedService.openSnackbar('Patient number does not exists.', 3500) : 0
          response.forEach((el, i) => {
            if (el.patientNumber === patientNumber && doctorName !== null) { resolve(el); }
          });
        });
      }
    );
    promise.then((doc: any) => {
      this.reference = this.db.list<any>(`patient-list-DOCTORS/${doc.patientUid}`);
      this.reference.valueChanges().subscribe((response) => {
        const filter = response.filter((response3) => response3.doctorName === doctorName);
        if (filter.length === 0) {
          this.reference.push({ doctorName })
            .then(() => this.sharedService.openSnackbar(`Successfully added doctor ${doctorName} patient ${doc.patientName}`, 3500));
        } else this.sharedService.openSnackbar(`Doctor ${doctorName} already exists in patient ${doc.patientName}, please try again.`, 3500);
      });
    })
    this.doctorDetailsRef.valueChanges().subscribe((response: any) => {
      response.filter((el) => el.doctorName === doctorName).length === 0 ? this.sharedService.openSnackbar('Doctor name does not exists.', 3500) : 0
    })
  }

  addPatientToDoctor(patientNumber: string, doctorNumber: string) {
    const promise = new Promise(
      (resolve, reject) => {
        this.doctorDetailsRef.valueChanges().subscribe((response: any) => {
          response.filter((el) => el.doctorNumber === doctorNumber).length === 0 ? this.sharedService.openSnackbar('Doctor number does not exists.', 3500) : 0
          response.forEach((el, i) => {
            if (el.doctorNumber.trim() === doctorNumber.trim()) { resolve(el); }
          });
        });
      });
    promise.then((doc: any) => {
      this.reference = this.db.list<any>(`doctor-list-PATIENTS/${doc.doctorUid}`);
      this.patientDetailsRef.valueChanges().subscribe((response: any) => {
        response.filter((el) => el.patientNumber === patientNumber).length === 0 ? this.sharedService.openSnackbar('Patient number does not exists.', 3500) : 0
        response.forEach((el, i) => {
          if (el.patientNumber === patientNumber) {
            this.reference.valueChanges().subscribe((response2: any) => {
              const filter = response2.filter((response3) => response3.patientUid === el.patientUid);
              if (filter.length === 0) {
                this.reference.push(el)
                  .then(() => this.sharedService.openSnackbar(`Successfully added patient ${el.patientName} to doctor ${doc.doctorName}`, 3500));
              } else this.sharedService.openSnackbar(`Patient ${el.patientName} already exists in doctor ${doc.doctorName}, please try again.`, 3500);
            });
          }
        });
      });
    })
  }

  getDoctorName(doctorUid: string) {
    const promise = new Promise(
      (resolve, reject) => {
        this.doctorDetailsRef.valueChanges().subscribe((response: any) => {
          response.map((el, i) => {
            if (doctorUid === el.doctorUid) resolve(el.doctorName)
          });
        });
      }
    );

    return promise.then((doctorName) => doctorName);
  }

  getPatientName(patientUid: string) {
    const promise = new Promise(
      (resolve, reject) => {
        this.patientDetailsRef.valueChanges().subscribe((response: any) => {
          response.map((el, i) => {
            if (patientUid === el.patientUid) resolve(el.patientName)
          });
        });
      }
    );

    return promise.then((patientUid) => patientUid);
  }

  getPatientsDoctorsDetails(doctorName: any[]) {
    doctorName = doctorName.map((el) => el.doctorName)

    return this.doctorDetailsRef.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => {
          if (doctorName.includes(c.payload.val().doctorName)) {
            return { key: c.payload.key, ...c.payload.val() }
          }
        }).filter(el => el !== undefined);
      })
    );
  }

  addRemarks(remark: IDoctorsRemarks) {
    this.patientDetailsRef.valueChanges().subscribe((response) => {
      const isExists = response.find((el) => el.patientNumber === remark.patientNumber);
      if (isExists !== undefined) {
        this.addRemarkRef.push(remark)
          .then(() => this.sharedService.openSnackbar(`Remark added to patient no. ${remark.patientNumber}`, 3500));
      } else this.sharedService.openSnackbar(`Patient no. ${remark.patientNumber} does not exists`, 3500);
    });
  }

  addPatientMessageToDoctor(remark: IPatientRemarks) {
    this.doctorDetailsRef.valueChanges().subscribe((response) => {
      const isExists = response.find((el) => el.doctorNumber === remark.doctorNumber);
      if (isExists !== undefined) {
        this.addPatientRemarkRef.push(remark)
          .then(() => this.sharedService.openSnackbar(`Remark added to doctor no. ${remark.doctorNumber}`, 3500));
      } else this.sharedService.openSnackbar(`Doctor no. ${remark.doctorNumber} does not exists`, 3500);
    });
  }

  get readPatientRemarks() {
    return this.addPatientRemarkRef.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
    );
  }

  addSettime(settime: ISettime) {
    const ref = firebase.database().ref('set-time');
    ref.push({
      ...settime,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    })
  }

}
