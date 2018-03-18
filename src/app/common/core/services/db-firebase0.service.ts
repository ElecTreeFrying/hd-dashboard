import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable()
export class DbFirebaseService0 {

  reference: AngularFireList<any>;
  patientDetailsRef: AngularFireList<any>;
  doctorDetailsRef: AngularFireList<any>;
  adminDetailsRef: AngularFireList<any>;
  patientReadingsRef: AngularFireList<any>;

  constructor(private fb: AngularFireAuth, private db: AngularFireDatabase) {
    this.patientDetailsRef = this.db.list<any>('patient-list-DETAILS');
    this.doctorDetailsRef = this.db.list<any>('doctor-list-DETAILS');
    this.adminDetailsRef = this.db.list<any>('admin-list-DETAILS');
    this.patientReadingsRef = this.db.list<any>('patient-readings');
  }

  getPatientDetails(uid: string) {
    return this.patientDetailsRef.snapshotChanges().map((response) => {
      return response.map((response2) => {
        const patientUid = response2.payload.val().patientUid;
        if (patientUid === uid)
        return { key: response2.payload.key, ...response2.payload.val() };
      }).filter((response) => response !== undefined);
    })
  }

  getDoctorDetails(uid: string) {
    return this.doctorDetailsRef.snapshotChanges().map((response) => {
      return response.map((response2) => {
        const doctorUid = response2.payload.val().doctorUid;
        if (doctorUid === uid)
          return { key: response2.payload.key, ...response2.payload.val() };
      }).filter((response) => response !== undefined);
    })
  }

  get getPatientList() {
    return this.patientDetailsRef.valueChanges();
  }

  get getDoctorList() {
    return this.doctorDetailsRef.valueChanges();
  }

  get getAdminList() {
    return this.adminDetailsRef.valueChanges();
  }

  get getPatientReadings() {
    return this.patientReadingsRef.valueChanges();
  }

  getPatientsDoctors(data: any) {
    return this.db.list<any>(`patient-list-DOCTORS/${data}`).valueChanges();
  }

  getDoctorsPatients(data: any) {
    return this.db.list<any>(`doctor-list-PATIENTS/${data}`).valueChanges()
  }

}
