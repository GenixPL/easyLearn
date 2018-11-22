import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Page, EventData } from 'tns-core-modules/ui/page/page';
import { ListView, ItemEventData } from "tns-core-modules/ui/list-view";
import { Image } from "tns-core-modules/ui/image";
import { from } from 'rxjs';


import { getSetsFiles, deleteSet } from '../set/file-functions.tns';
import { Router } from '@angular/router';
import { ButtonImageComponent } from '../ui/btn-img/btn-img.component';
import { Button } from 'tns-core-modules/ui/button/button';

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
			this.refresh();
        });
	}

	moveToCreateNewSetComponent() {
		this.router.navigate(["create-new-set"]);
	}

	refresh(){
		this.getSets();
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

	deleteSet(event: EventData) {
		let btn = <Button>event.object;

		let setName: string = this.filesArray[btn.id + 0]; //"+0" coverts this id to number
		deleteSet(setName);
		
		this.refresh();
	}
}