import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'ui/page';

@Component({
  selector: 'app-sets-menu',
  templateUrl: './sets-menu.component.html',
  styleUrls: ['./sets-menu.component.css']
})
export class SetsMenuComponent implements OnInit {

  constructor(private router:Router, private page:Page) { 
    page.actionBarHidden = true;
  }

  ngOnInit() {
  }

  moveToHomeComponent() {
    this.router.navigate(["home"]);
  }

  moveToCreateNewSetComponent() {
    this.router.navigate(["create-new-set"]);
  }

  moveToSetsOnDeviceComponent() {
	  this.router.navigate(["sets-on-device"]);
  }

}
