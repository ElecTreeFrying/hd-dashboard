import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Data } from '@angular/router';

import * as Chart from 'chart.js';


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

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.chart();

    this.route.data.subscribe((response: Data) => {
      this.patientName = response['0'].patientName;
      this.patientEmail = response['0'].patientEmail;
      this.patientNumber = response['0'].patientNumber;
      // this.patientDoctor = response['0'].doctorName;
      this.patientDoctors = response[0].response2
    });
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
              labels: ["SBP", "DBP", "HR", "PTT", "ECG", "PPG"],
              datasets: [{
                  label: 'yaba',
                  data: [5, -9, -5, -7, 5 ,2],
                  backgroundColor: [
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                  ],
                  borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)'
                  ],
                  borderWidth: 1
              }, {
                  label: 'baba',
                  data: [3, -6, 8 ,2 , -4, -9],
                  backgroundColor: [
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                  ],
                  borderColor: [
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                  ],
                  borderWidth: 1
              }, {
                  label: 'abba',
                  data: [-6, 8, -2, 4, -9, 2],
                  backgroundColor: [
                    'rgba(153, 102, 255, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(153, 102, 255, 1)',
                  ],
                  borderColor: [
                    'rgba(153, 102, 255, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(153, 102, 255, 1)',
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
