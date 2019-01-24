import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Page, EventData } from 'tns-core-modules/ui/page/page';
import { ELSet } from '~/app/models/el-set';
import { ChangeSetService } from '~/app/services/change-set.service';
import { prompt, PromptOptions, inputType, PromptResult } from 'tns-core-modules/ui/dialogs/dialogs';
import { Image } from 'tns-core-modules/ui/image/image';
import { ELSetValidationResult, validateSet } from '~/app/models/set-validator';
import * as Toast from 'nativescript-toast';


@Component({
	selector: 'manage-set',
	templateUrl: './manage-set.component.html',
	styleUrls: ['./manage-set.component.css'],
})

export class ManageSetComponent {

	@ViewChild('myfilter') myfilter: ElementRef;

	private set: ELSet;
	private lastLanguage: string;
	private listItems = require('~/assets/languages.json');

	constructor(private router: Router, private page: Page, private changeSetService: ChangeSetService) {
		page.actionBarHidden = true;
		this.set = changeSetService.currentSet;
	}

	changeSetNameDialog() {
		let options: PromptOptions = {
			title: "Give new name:",
			defaultText: this.set.getSetName(),
			inputType: inputType.text,
			okButtonText: "OK",
			cancelButtonText: "Cancel",
			cancelable: true
		};

		prompt(options).then((result: PromptResult) => {
			this.set.changeSetName(result.text);
		});
	}

	cancelFilterableList() {
		this.lastLanguage = "";
	}

	itemTapped(args) {
		if (this.lastLanguage == "1") {
			this.set.changeFirstLanguage(args.selectedItem.title);
		} else {
			this.set.changeSecondLanguage(args.selectedItem.title);
		}
	}

	showPicker(event: EventData) {
		this.myfilter.nativeElement.show();

		let btn = <Image>event.object
		this.lastLanguage = btn.id;
	}

	saveSet() { 
		let result: ELSetValidationResult = validateSet(this.set.toJSON());
		if (!result.is_valid) {
			Toast.makeText(`${result.err}`, `long`).show();
			return;
		}
		
		this.changeSetService.saveSet(this.set);
	}

	addWords() {
		this.changeSetService.currentSet = this.set;
		this.router.navigate(["add-words"]);
	}
}