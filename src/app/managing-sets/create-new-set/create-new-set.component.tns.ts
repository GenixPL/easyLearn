import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import * as Toast from 'nativescript-toast';
import { Button } from 'tns-core-modules/ui/button';
import { inputType, prompt, PromptOptions, PromptResult } from 'tns-core-modules/ui/dialogs';
import { topmost, EventData } from 'tns-core-modules/ui/frame';
import { Page } from 'tns-core-modules/ui/page';
import * as firebase from 'nativescript-plugin-firebase';

import { ELSet, ELSetInterface } from '../../models/el-set';
import { createNewSetForUser } from '~/app/firebase-functions/create-new-set';
import { log } from '~/app/logger/logger';


registerElement("FilterableListpicker", () => require("nativescript-filterable-listpicker").FilterableListpicker);


@Component({
	selector: 'app-create-new-set',
	templateUrl: './create-new-set.component.html',
	styleUrls: ['./create-new-set.component.css']
})

export class CreateNewSetComponent implements OnInit {

	@ViewChild('CB1') check_box_add_to_library: ElementRef;
	@ViewChild('myfilter') myfilter: ElementRef;

	addToLibrary: boolean = false;
	newSetName: string = "set-name";
	language1: string;
	language2: string;
	listitems = [
		{
			"title": "EN",
			"description": "English"
		},
		{
			"title": "DE",
			"description": "German"
		},
	];
	lastLanguage: string;

	constructor(private page: Page) {
		page.actionBarHidden = true;
	}

	ngOnInit() {
	}

	triggerCheckBox() {
		this.addToLibrary = !this.addToLibrary;
		Toast.makeText(String(this.addToLibrary)).show();
	}

	changeSetNameDialog() {
		let options: PromptOptions = {
			title: "Give new name:",
			defaultText: this.newSetName,
			inputType: inputType.text,
			okButtonText: "OK",
			cancelButtonText: "Cancel",
			cancelable: true
		};

		prompt(options).then((result: PromptResult) => {
			this.newSetName = result.text;
		});
	}

	cancelFilterableList() {
		this.lastLanguage = "";
	}

	itemTapped(args) {
		if (this.lastLanguage == "1") {
			this.language1 = args.selectedItem.title;
		} else {
			this.language2 = args.selectedItem.title;
		}
	}

	showPicker(event: EventData) {
		this.myfilter.nativeElement.show();

		let btn = <Button>event.object
		this.lastLanguage = btn.id;
	}

	saveSet() {
		let newSet: ELSetInterface = {
			set_name: this.newSetName,
			document_id: "wrong-id",
			language1: this.language1,
			language2: this.language2,
			words: [{word1:"!", word2:"?"}]
		}

		log(`${JSON.stringify(newSet)}`);

		firebase.getCurrentUser()
		.then((user) => {
			createNewSetForUser(newSet, user);

		}).catch((err) => {
			log(`${err}`);
		});
	}
}

// TODO: check correctness of data to save