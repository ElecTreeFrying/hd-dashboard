import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-doctors-remarks-dialog',
  templateUrl: './doctors-remarks-dialog.component.html',
  styleUrls: ['./doctors-remarks-dialog.component.scss']
})
export class DoctorsRemarksDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { 
  }

}
