import { Component, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  @ViewChild('patgen') pat_gen: MatExpansionPanel;
  @ViewChild('docgen') doc_gen: MatExpansionPanel;
  @ViewChild('gengen') gen_gen: MatExpansionPanel;
  @ViewChild('patlist') pat_list: MatExpansionPanel;
  @ViewChild('doclist') doc_list: MatExpansionPanel;
  @ViewChild('adlist') ad_list: MatExpansionPanel;
  @ViewChild('addpatdoc') add_pat_doc: MatExpansionPanel;
  @ViewChild('adddocpat') add_doc_pat: MatExpansionPanel;
  @ViewChild('addpat') add_pat: MatExpansionPanel;
  @ViewChild('adddoc') add_doc: MatExpansionPanel;
  @ViewChild('addad') add_ad: MatExpansionPanel;

  isExpand: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  refresh() {
    window.location.reload();
  }

  onCollapsePanels() {
    this.pat_gen.close();
    this.doc_gen.close();
    this.gen_gen.close();
    this.pat_list.close();
    this.doc_list.close();
    this.ad_list.close();
    this.add_pat_doc.close();
    this.add_doc_pat.close();
    this.add_pat.close();
    this.add_doc.close();
    this.add_ad.close();
    this.isExpand = true;
  }

  onExpandPanels() {
    this.pat_gen.open();
    this.doc_gen.open();
    this.gen_gen.open();
    this.pat_list.open();
    this.doc_list.open();
    this.ad_list.open();
    this.add_pat_doc.open();
    this.add_doc_pat.open();
    this.add_pat.open();
    this.add_doc.open();
    this.add_ad.open();
    this.isExpand = false;
  }

}
