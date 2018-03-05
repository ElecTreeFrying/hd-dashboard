import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Chance } from 'chance';

import { SharedService } from "../../common/core/services/shared.service";


@Component({
  selector: 'app-generate-account-no',
  templateUrl: './generate-account-no.component.html',
  styleUrls: ['./generate-account-no.component.scss']
})
export class GenerateAccountNoComponent implements OnInit {

  @Input() account: string;
  randomAlphaNumeric: string = 'Click generate to continue.';
  isClicked: boolean = false;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
  }

  generateNo() {
    const chance = new Chance();
    const randomChance = chance.integer({min: 100000000000, max: 999999999999});

    this.isClicked = true;

    this.randomAlphaNumeric = this.account === 'Patient' ? `PX-${randomChance}` : `DX-${randomChance}`
  }

  onClipboard() {
    const between = 900;
    this.sharedService.openSnackbar('Copied to clipboard', between);
    setTimeout(() => {
      let prefix = '';
      prefix = this.account === 'Patient' ? `Patient no. ${this.randomAlphaNumeric}` : `Doctor no. ${this.randomAlphaNumeric}`
      this.sharedService.openSnackbar(prefix, 3500)
    }, between);
  }

}
