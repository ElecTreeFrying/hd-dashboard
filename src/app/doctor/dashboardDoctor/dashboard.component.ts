import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ShortenPipe } from 'ngx-pipes';

import * as Chart from 'chart.js';

import { SetTimeDialogComponent } from "../../common/shared/components/set-time-dialog/set-time-dialog.component";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('myChart') myChart: ElementRef;

  settimeDialogRef: MatDialogRef<SetTimeDialogComponent>;
  patientDetails: Observable<any>;

  constructor(private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
    this.route.data.subscribe((response: Data) => {
      this.patientDetails = response['0'];
    });
  }

  onSetime(patient) {
    this.dialog.open(SetTimeDialogComponent, { data: patient });
  }

}
