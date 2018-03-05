import { Injectable } from '@angular/core';

import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';


@Injectable()
export class SharedService {

  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private snackBar: MatSnackBar) { }

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

}
