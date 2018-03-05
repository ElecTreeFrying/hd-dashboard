import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  openDoctorsRemarks() {
    this.router.navigate(['doctors-remarks'], { relativeTo: this.route });
  }

  openVitalSigns() {
    this.router.navigate(['vital-signs'], { relativeTo: this.route });
  }

  openUserManual() {
    this.router.navigate(['user-manual'], { relativeTo: this.route });
  }

}
