import { Component, OnInit } from '@angular/core';
import { Chance } from 'chance';

import { SharedService } from "../../common/core/services/shared.service";


@Component({
  selector: 'app-generate-account-details',
  templateUrl: './generate-account-details.component.html',
  styleUrls: ['./generate-account-details.component.scss']
})
export class GenerateAccountDetailsComponent implements OnInit {

  randomFullname: string = 'Generate random fullname';
  randomEmail: string = 'Generate random email';
  randomPassword: string = 'Generate random password';
  isClicked: boolean = false;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
  }

  generateNo(option: number) {
    const chance = new Chance();
    const randomFullname = chance.name();
    const randomEmail = chance.email();
    const randomPassword = chance.geohash({ length: 7 });

    this.isClicked = true;

    if (option === 0) {
      this.randomFullname = `${randomFullname}`;
    } else if (option === 1) {
      this.randomEmail = `${randomEmail}`;
    } else if (option === 2) {
      this.randomPassword = `${randomPassword}`;
    }
  }

  onClipboard(option: number) {
    const between = 900;
    this.sharedService.openSnackbar('Copied to clipboard', between);
    setTimeout(() => {
      let prefix = '';
      if (option === 0) {
        prefix = this.randomFullname;
        this.sharedService.openSnackbar(`Fullname: ${prefix}`, 3500)
      } else if (option === 1) {
        prefix = this.randomEmail;
        this.sharedService.openSnackbar(`Email: ${prefix}`, 3500)
      } else if (option === 2) {
        prefix = this.randomPassword;
        this.sharedService.openSnackbar(`Password: ${prefix}`, 3500)
      }
    }, between);
  }

}
