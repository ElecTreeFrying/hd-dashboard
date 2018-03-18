import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, RoutesRecognized } from '@angular/router';
import { MatSidenav, MatDialog, MatDialogRef } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import { OptionDialogComponent } from "./common/shared/components/option-dialog/option-dialog.component";

import { AuthFirebaseService } from "./common/core/services/auth-firebase.service";
import { SharedService } from "./common/core/services/shared.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  optionDialogRef: MatDialogRef<OptionDialogComponent>;

  isShowSignout: boolean = false;
  isAuthenticated: Observable<any>;

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private fb: AngularFireAuth, private authFirebaseService: AuthFirebaseService, private sharedService: SharedService) {}

  ngOnInit() {
    this.router.events.subscribe((route: NavigationStart) => {
      if (route instanceof NavigationStart) {
        this.isShowSignout = route.url === '/'
          ? false : true;

        route.url === '/'
          ? setTimeout(() => { this.openOptionDialog(); this.authFirebaseService.signOutUser(false); }, 1000)
          : 0;
      }
    });

    this.isAuthenticated = this.fb.authState;
  }

  openOptionDialog() {
    this.optionDialogRef = this.dialog.open(OptionDialogComponent, { disableClose: true });

    this.optionDialogRef.backdropClick().subscribe(() => {
      const message = 'Select one to continue.';
      const duration = 3500;
      this.sharedService.openSnackbar(message, duration)
    });
  }

  onSignout() {
    this.authFirebaseService.signOutUser(true);
  }

}
