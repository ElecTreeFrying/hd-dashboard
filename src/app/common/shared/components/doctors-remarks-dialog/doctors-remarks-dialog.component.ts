import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-doctors-remarks-dialog',
  templateUrl: './doctors-remarks-dialog.component.html',
  styleUrls: ['./doctors-remarks-dialog.component.scss']
})
export class DoctorsRemarksDialogComponent implements OnInit {

  timestamp: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    let newTimestamp = this.data.remarks.timestamp;
    newTimestamp = newTimestamp.substring(4, newTimestamp.length).trim().split(' ');
    newTimestamp = newTimestamp.map((el, i) => { if (i < 3) return el; });
    newTimestamp = newTimestamp.filter((el) => el !== undefined);
    this.timestamp = newTimestamp.join(' ');
  }

}
