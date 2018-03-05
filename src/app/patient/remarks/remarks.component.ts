import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute, Data } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ShortenPipe } from 'ngx-pipes';

import { DoctorsRemarksDialogComponent } from "../../common/shared/components/doctors-remarks-dialog/doctors-remarks-dialog.component";


@Component({
  selector: 'app-remarks',
  templateUrl: './remarks.component.html',
  styleUrls: ['./remarks.component.scss']
})
export class RemarksComponent implements OnInit {

  doctorsRemarksDialogRef: MatDialogRef<DoctorsRemarksDialogComponent>;
  remarks: any;

  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
    this.route.data.subscribe((response: any) => {
      response['0'].subscribe((response2) => {
        this.remarks = response2;
        this.remarks = this.remarks.filter((el) => el !== undefined);
      });
    });
  }

  openDoctorsRemarks(data: any) {
    this.doctorsRemarksDialogRef = this.dialog.open(DoctorsRemarksDialogComponent, { data: { remarks: data } });
  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  onNext() {

  }

}
