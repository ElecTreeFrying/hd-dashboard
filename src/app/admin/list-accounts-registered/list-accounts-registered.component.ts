import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { DbFirebaseService0 } from "../../common/core/services/db-firebase0.service";
import { SharedService } from "../../common/core/services/shared.service";

import { ListDetailsDialogComponent } from "../../common/shared/components/list-details-dialog/list-details-dialog.component";
import { SearchUserDialogComponent } from "../../common/shared/components/search-user-dialog/search-user-dialog.component";


@Component({
  selector: 'app-list-accounts-registered',
  templateUrl: './list-accounts-registered.component.html',
  styleUrls: ['./list-accounts-registered.component.scss']
})
export class ListAccountsRegisteredComponent implements OnInit {

  @Input() client: string;
  patientList: Observable<any>;
  doctorList: Observable<any>;
  adminList: Observable<any>;
  patientListLength: any;
  doctorListLength: any;
  adminListLength: any;
  isClicked: boolean = false;
  buttonMode: string = 'copy only'

  listDetailsDialogRef: MatDialogRef<ListDetailsDialogComponent>;
  searchUserDialogRef: MatDialogRef<SearchUserDialogComponent>;

  constructor(private route: ActivatedRoute, private dbFirebaseService: DbFirebaseService0, private sharedService: SharedService, private dialog: MatDialog) { }

  ngOnInit() {
    this.patientList = this.dbFirebaseService.getPatientList;
    this.doctorList = this.dbFirebaseService.getDoctorList;
    this.adminList = this.dbFirebaseService.getAdminList;

    this.patientList.subscribe((response) => this.patientListLength = response.length);
    this.doctorList.subscribe((response) => this.doctorListLength = response.length);
    this.adminList.subscribe((response) => this.adminListLength = response.length);
  }

  onClipboard(option: boolean, value: any) {
    if (option) {
      const message = `Patient ${value['type']} ${value['value']} copied to clipboard`;
      this.sharedService.openSnackbar(message, 3500);
    } else {
      const message = `Doctor ${value['type']} ${value['value']} copied to clipboard`;
      this.sharedService.openSnackbar(message, 3500);
    }

    if (value.action) {
      this.listDetailsDialogRef = this.dialog.open(ListDetailsDialogComponent, { data: { data: value.data, option } });
    }
  }

  onClick(option: boolean) {
    this.isClicked = option;
    this.buttonMode = option ? 'view and copy' : 'copy only';
    option
      ? this.sharedService.openSnackbar('Mode: view and copy', 3500)
      : this.sharedService.openSnackbar('Mode: copy only', 3500);
  }

  onSearch(option: boolean) {
    this.searchUserDialogRef = this.dialog.open(SearchUserDialogComponent, { data: { option, list: this.route.snapshot.data } });
  }

}
