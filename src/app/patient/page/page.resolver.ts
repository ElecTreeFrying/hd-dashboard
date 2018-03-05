import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { DbFirebaseService } from "../../common/core/services/db-firebase.service";
import { AuthFirebaseService } from "../../common/core/services/auth-firebase.service";


@Injectable()
export class PageResolver implements Resolve<any> {

  constructor(private db: AngularFireDatabase, private dbFirebaseService: DbFirebaseService, private authFirebaseService: AuthFirebaseService) {}

  resolve(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const promise = new Promise(
      (resolve, reject) => {
        this.dbFirebaseService.patientDetailsRef.valueChanges().subscribe((response: any) => {
          response.forEach((el, i) => {
            const currentUserId = this.authFirebaseService.currentUserId;
            const elementId = el.patientUid;
            if (elementId === currentUserId) {
              this.db.list<any>(`patient-list-DOCTORS/${elementId}`).valueChanges().subscribe((response2: any) => {
                if (response2.length !== 0) {
                  const doctorName = response2['0'].doctorName;
                  resolve({doctorName, ...el, response2});
                } else {
                  const doctorName = '**no doctor assigned**';
                  resolve({doctorName, ...el, response2});
                }
              });
            }
          });
        });
      }
    );

    return promise.then((response: any) => response);
  }

}
