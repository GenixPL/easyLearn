import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'app-sets-on-device',
  templateUrl: './sets-on-device.component.html',
  styleUrls: ['./sets-on-device.component.css']
})
export class SetsOnDeviceComponent implements OnInit {

  constructor(private page:Page) {
	  page.actionBarHidden = true;
   }

  ngOnInit() {
  }

}
