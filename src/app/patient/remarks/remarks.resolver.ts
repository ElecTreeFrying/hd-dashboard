import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { DbFirebaseService } from "../../common/core/services/db-firebase.service";
import { AuthFirebaseService } from "../../common/core/services/auth-firebase.service";


@Injectable()
export class RemarksResolver implements Resolve<any> {

  constructor(private route: ActivatedRoute, private dbFirebaseService: DbFirebaseService, private authFirebaseService: AuthFirebaseService) {}

  resolve(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUserId = this.authFirebaseService.currentUserId;

    const promise = new Promise(
      (resolve, reject) => {
        this.dbFirebaseService.patientDetailsRef.valueChanges().subscribe((response) => {
          const patient = response.filter((el) => el.patientUid === currentUserId);
          resolve(patient[0].patientNumber);
        });
      }
    )

    return promise.then((pNumber) => {
      return this.dbFirebaseService.addRemarkRef.snapshotChanges().pipe(
        map((changes) => {
          return changes.map((snapshot) => {
            const patientNumber = snapshot.payload.val().patientNumber;
            if (pNumber === patientNumber) {
              return { key: snapshot.payload.key, ...snapshot.payload.val() };
            }
          });
        })
      );
    });
  }
}
