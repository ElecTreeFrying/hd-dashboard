import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { DbFirebaseService0 } from "./db-firebase0.service";
import { AuthFirebaseService } from "./auth-firebase.service";


@Injectable()
export class DoctorListResolver implements Resolve<any> {

  constructor(private dbFirebaseService: DbFirebaseService0, private authFirebaseService: AuthFirebaseService) {}

  resolve(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const promise = new Promise(
      (resolve, reject) => {
        this.dbFirebaseService.getDoctorList.subscribe((response) => resolve(response));
      }
    );

    return promise.then((doc: any) => doc);
  }

}
