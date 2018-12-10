import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import * as firebase from 'nativescript-plugin-firebase';
import * as Toast from 'nativescript-toast';
import { Button } from 'tns-core-modules/ui/button';
import { inputType, prompt, PromptOptions, PromptResult } from 'tns-core-modules/ui/dialogs';
import { EventData } from 'tns-core-modules/ui/frame';
import { Page } from 'tns-core-modules/ui/page';

import { ELSetInterface, getSetFromJSON } from '../../models/el-set';
import { createNewSetForUser } from '~/app/firebase-functions/create-new-set';
import { log } from '~/app/logger/logger';
import { User } from 'nativescript-plugin-firebase';


registerElement("FilterableListpicker", () => require("nativescript-filterable-listpicker").FilterableListpicker);

@Component({
	selector: 'app-create-new-set',
	templateUrl: './create-new-set.component.html',
	styleUrls: ['./create-new-set.component.css']
})

export class CreateNewSetComponent implements OnInit {

	@ViewChild('CB1') check_box_add_to_library: ElementRef;
	@ViewChild('myfilter') myfilter: ElementRef;

	private newSetName: string = "set-name";
	private language1: string;
	private language2: string;
	private lastLanguage: string;
	private listItems = require('~/assets/languages.json');


	constructor(private page: Page) {
		page.actionBarHidden = true;
	}

	ngOnInit() {
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

	async saveSet() {
		let newSet: ELSetInterface = {
			set_name: this.newSetName,
			document_id: "wrong-id",
			created_date: new Date(),
			language1: this.language1,
			language2: this.language2,
			words: [{ word1: "!", word2: "?" }] //remove this later
		}

		try {
			let user: User = await firebase.getCurrentUser();
			createNewSetForUser(newSet, user);

		} catch (err) {
			log(`✘ get current user`);
		}

	}
}

// TODO: check correctness of data to save