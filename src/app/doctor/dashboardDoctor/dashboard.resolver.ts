import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { DbFirebaseService } from "../../common/core/services/db-firebase.service";
import { AuthFirebaseService } from "../../common/core/services/auth-firebase.service";


@Injectable()
export class DashboardResolver implements Resolve<any> {

  reference: AngularFireList<any>;

  constructor(private db: AngularFireDatabase, private dbFirebaseService: DbFirebaseService, private authFirebaseService: AuthFirebaseService) {}

  resolve(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const promise = new Promise(
      (resolve, reject) => {
        const currentUserId = this.authFirebaseService.currentUserId;
        this.dbFirebaseService.doctorDetailsRef.valueChanges().subscribe((response: any) => {
          response.forEach((el, i) => {
            if (el.doctorUid === currentUserId) {
              resolve(el);
            }
          });
        });
      }
    );

    return promise.then((doc: any) => {
      this.reference = this.db.list<any>(`doctor-list-PATIENTS/${doc.doctorUid}`);
      return this.reference.valueChanges();
    });
  }
}
