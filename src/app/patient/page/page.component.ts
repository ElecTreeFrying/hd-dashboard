import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { MatDialog } from '@angular/material';
import * as Chart from 'chart.js';

import { MessageDoctorDialogComponent } from "../../common/shared/components/message-doctor-dialog/message-doctor-dialog.component";
import { HardwareIssuesDialogComponent } from "../../common/shared/components/hardware-issues-dialog/hardware-issues-dialog.component";

import { DbFirebaseService0 } from "../../common/core/services/db-firebase0.service";


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  @ViewChild('myChart') myChart: ElementRef;
  patientName: string;
  patientEmail: string;
  patientNumber: string;
  patientDoctors: any;
  patientReading: any;

  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private dbFirebaseService0: DbFirebaseService0) { }

  ngOnInit() {
    this.route.data.subscribe((response: Data) => {
      this.patientName = response['0'].patientName;
      this.patientEmail = response['0'].patientEmail;
      this.patientNumber = response['0'].patientNumber;
      this.patientDoctors = response[0].response2
    });

    this.dbFirebaseService0.getPatientReadings.subscribe((response) => {
      response.forEach((el) => {
        const blank = {};
        const newData = el.split(' ');

        newData.forEach((el) => {
          const newEl = el.split('/');
          blank[newEl[0]] = newEl[1];
        })

        blank['patientNo'] === this.patientNumber ? this.patientReading = blank : 0;
      })

      this.chart();
    })

  }

  messageDoctor() {
    this.dialog.open(MessageDoctorDialogComponent, { data: this.patientDoctors });
  }

  openHardwareIssues() {
    this.dialog.open(HardwareIssuesDialogComponent);
  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  onNext() {

  }

  chart() {
    const chart = new Chart(this.myChart.nativeElement, {
      type: 'bar',
          data: {
              labels: ["Patient readings"],
              datasets: [{
                  label: 'SBP',
                  data: [this.patientReading.sbpVal],
                  backgroundColor: [
                    'blue',
                  ],
                  borderColor: [
                    'blue',
                  ],
                  borderWidth: 1
              }, {
                  label: 'DBP',
                  data: [this.patientReading.dbpVal],
                  backgroundColor: [
                    'red',
                  ],
                  borderColor: [
                    'red',
                  ],
                  borderWidth: 1
              }, {
                  label: 'HR',
                  data: [this.patientReading.hrVal],
                  backgroundColor: [
                    'green',
                  ],
                  borderColor: [
                    'green',
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true
                      }
                  }]
              }
          }
      });
  }

}
