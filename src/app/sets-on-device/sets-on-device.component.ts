import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Page } from 'tns-core-modules/ui/page/page';
import { ListView } from "tns-core-modules/ui/list-view";


import { getSetsFiles } from '../set/file-functions.tns';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sets-on-device',
  templateUrl: './sets-on-device.component.html',
  styleUrls: ['./sets-on-device.component.css']
})


export class SetsOnDeviceComponent implements OnInit {

	private filesArray: Array<string>;
	private listView_sets: ListView;

	constructor(private page:Page, private router: Router, private location : PlatformLocation) {
		page.actionBarHidden = true;

		this.listView_sets = page.getViewById(`listView_sets`);
	}

  	ngOnInit() {
		this.getSets();

		this.page.on("navigatingTo", () => {
			//this is executed after navigating back to this page
			this.getSets();
			this.refresh();
        });
	}

	moveToCreateNewSetComponent() {
		this.router.navigate(["create-new-set"]);
	}

	refresh(){
        this.listView_sets = <ListView>this.page.getViewById("listView_sets");
        this.listView_sets.refresh();
	}

	getSets() {
		this.filesArray = getSetsFiles();

		let re = /.json|.txt/gi;
		for (let i = 0; i < this.filesArray.length; i++) {
			this.filesArray[i] = this.filesArray[i].replace(re, ``);
		}
	}
}