import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { Settime } from "../../model/patient.model";
import { DbFirebaseService } from "../../../core/services/db-firebase.service";


@Component({
  selector: 'app-set-time-dialog',
  templateUrl: './set-time-dialog.component.html',
  styleUrls: ['./set-time-dialog.component.scss']
})
export class SetTimeDialogComponent implements OnInit {

  duration = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  between = [];

  settimeForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private dbFirebaseService: DbFirebaseService) { }

  ngOnInit() {
    this.settimeForm = new FormGroup({
      'duration': new FormControl(null, [ Validators.required ]),
      'between': new FormControl(null, [ Validators.required ]),
    });

    this.initBetween();
  }

  initBetween() {
    this.between = [
      { number: 1, numbers: [0.5] },
      { number: 2, numbers: [0.5, 1] },
      { number: 3, numbers: [0.5, 1] },
      { number: 4, numbers: [0.5, 1, 2] },
      { number: 5, numbers: [0.5, 1] },
      { number: 6, numbers: [0.5, 1, 2, 3] },
      { number: 7, numbers: [0.5, 1] },
      { number: 8, numbers: [0.5, 1, 2, 4] },
      { number: 9, numbers: [0.5, 1, 3] },
      { number: 10, numbers: [0.5, 1, 2, 5] }
    ]
  }

  onChange(value: any) {
    this.initBetween();
    const filtered = this.between.filter(el => el.number === value);
    this.between = filtered[0].numbers;
  }

  onSave() {
    if (this.settimeForm.invalid) return;
    const form = this.settimeForm.value;
    const duration = form['duration'];
    const between = form['between'];

    const settime = new Settime(this.data.patientUid, duration, between);

    this.dbFirebaseService.addSettime(settime);

    this.dialog.closeAll();
  }

}
