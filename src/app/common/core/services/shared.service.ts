import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { Chance } from 'chance';


@Injectable()
export class SharedService {

  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  readings: AngularFireList<any>;

  constructor(private snackBar: MatSnackBar, private db: AngularFireDatabase) {
    this.readings = this.db.list<any>('patient-readings');
  }

  openSnackbar(message: string, duration: number) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = duration;
    this.snackBar.open(message, 'X', config);
  }

  onAuthenticated() {
    console.log('authenticated');
  }

  // FOR TESTING PURPOSES

  push() {
    this.readings.push('sbpVal/20.45 dbpVal/23.46 hrVal/2.63 patientNo/PX-250893605663');
  }

  data() {
    const p1 = 'PX-685542682046';
    const p2 = 'PX-250893605663';
    const p3 = 'PX-439509965293';
    const p4 = 'PX-786333927954';
    const p5 = 'PX-479414196731';

    for (let i = 0; i < 3; i++) {
      this.onPush(p1, i + 1); this.onPush(p2, i + 1); this.onPush(p3, i + 1); this.onPush(p4, i + 1); this.onPush(p5, i + 1);
    }
  }

  onPush(patientNo: string, int: number) {
    const chance = new Chance();
    const randomFloat1 = chance.floating({min: -30, max: 30, fixed: 2});
    const randomFloat2 = chance.floating({min: -30, max: 30, fixed: 2});
    const randomFloat3 = chance.floating({min: -30, max: 30, fixed: 2});

    const data = `sbpVal/${randomFloat1} dbpVal/${randomFloat2} hrVal/${randomFloat3} patientNo/${patientNo}`;

    // this.readings.push(data);
  }

}
