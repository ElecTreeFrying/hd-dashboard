import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { DbFirebaseService } from '../../common/core/services/db-firebase.service';
import { DoctorsRemarksDialogComponent } from '../../common/shared/components/doctors-remarks-dialog/doctors-remarks-dialog.component';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messages: Observable<any>;

  constructor(private dialog: MatDialog, private dbFirebaseService: DbFirebaseService) { }

  ngOnInit() {
    this.messages = this.dbFirebaseService.readPatientRemarks;
  }

  openMessage(data: any) {
    this.dialog.open(DoctorsRemarksDialogComponent, { data: { remarks: data } });
  }

}
