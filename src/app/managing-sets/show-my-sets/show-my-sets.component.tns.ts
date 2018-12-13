import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
import * as firebase from 'nativescript-plugin-firebase';
import { User } from 'nativescript-plugin-firebase';
import * as Toast from 'nativescript-toast';

import { getAllSetsForUser } from '../../firebase-functions/get-sets';
import { log } from '~/app/logger/logger';
import { isUndefined } from 'util';
import { ELSet, getSetFromJSON, ELSetInterface } from '~/app/models/el-set';
 

@Component({
	selector: 'show-my-sets',
	templateUrl: './show-my-sets.component.html',
	styleUrls: ['./show-my-sets.component.css'],
})

export class ShowMySetsComponent implements OnInit {

	private currentUser: User;
	private userSets: ELSet[] = new Array(0);

	constructor(private router: Router, private page: Page) {
		page.actionBarHidden = true;
	}

	async ngOnInit() {
		try {
			this.currentUser = await firebase.getCurrentUser();

		} catch (err) {
			log(`✘ get current user`);
			return;
		}

		if (isUndefined(this.currentUser)) {
			log(`✘ current user is undefined`);
			return;
		}

		try {
			this.userSets = await getAllSetsForUser(this.currentUser);
		} catch (err) {
			log(`✘ get user sets`);
			Toast.makeText(`${err} Try again.`);
		}
	}

	pff(setId: string){
		log(`holder: ${setId}`);
	}

}