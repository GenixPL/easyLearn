import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import { User } from 'nativescript-plugin-firebase';
import * as Toast from 'nativescript-toast';
import { Button } from 'tns-core-modules/ui/button';
import { inputType, prompt, PromptOptions, PromptResult } from 'tns-core-modules/ui/dialogs';
import { EventData } from 'tns-core-modules/ui/frame';
import { Page } from 'tns-core-modules/ui/page';
import { log } from '~/app/logger/logger';
import { ELSetValidationResult, validateSet } from '~/app/models/set-validator';
import { ELSetInterface } from '../../models/el-set';
import { FirebaseService } from '~/app/services/firebase.service';
import { Location } from '@angular/common';
import { Image } from 'tns-core-modules/ui/image/image';



registerElement("FilterableListpicker", () => require("nativescript-filterable-listpicker").FilterableListpicker);

@Component({
	selector: 'app-create-new-set',
	templateUrl: './create-new-set.component.html',
	styleUrls: ['./create-new-set.component.css']
})

export class CreateNewSetComponent {

	@ViewChild('myfilter') myfilter: ElementRef;

	private newSetName: string;
	private language1: string;
	private language2: string;
	private lastLanguage: string;
	private listItems = require('~/assets/languages.json');


	constructor (
		private page: Page,
		private location: Location,
		private firebase: FirebaseService
	) {
		page.actionBarHidden = true;
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

		let btn = <Image>event.object
		this.lastLanguage = btn.id;
	}

	async saveSet() {
		let newSet: ELSetInterface = {
			set_name: this.newSetName,
			document_id: "wrong-id",
			created_date: new Date(),
			language1: this.language1,
			language2: this.language2,
			words: [{ word1: "!", word2: "?" }] //TODO:remove this later
		}

		let result: ELSetValidationResult = validateSet(newSet);
		if (!result.is_valid) {
			Toast.makeText(`${result.err}`, `long`).show();
			return;
		}

		await this.firebase.addSetToUser(newSet);
		this.location.back();
	}
}