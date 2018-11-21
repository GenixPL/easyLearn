import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';


import { getSetsFiles } from '../set/file-functions.tns';


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
		console.time("receiving");
		let files: Array<string> = getSetsFiles();
		console.timeEnd("receiving");

		console.time("printing");
		files.forEach(element => {
			console.log(element);
		});
		console.timeEnd("printing");
	}

}
