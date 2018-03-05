import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

import { SharedService } from "../common/core/services/shared.service";


@Injectable()
export class PatientGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private afAuth: AngularFireAuth, private sharedService: SharedService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const promise = new Promise(
      (resolve, reject) => {
        this.afAuth.authState.subscribe((state: any) => {
          resolve(state !== null);
        });
      }
    );

    return promise.then((data: boolean) => {
      if (data) {
        return data;
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(next, state);
  }
}
