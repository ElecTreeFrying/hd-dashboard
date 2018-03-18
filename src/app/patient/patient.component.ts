import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  tabLinks = [
    { label: 'Doctor\'s Remarks', link: 'doctors-remarks' },
    { label: 'Vital Signs', link: 'vital-signs' },
    { label: 'User\'s Manual', link: 'user-manual' },
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.navigate(['vital-signs'], { relativeTo: this.route });
  }

}
