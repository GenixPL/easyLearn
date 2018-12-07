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

	private currentUser:User;
	private userSets:Array<ELSet> = new Array<ELSet>(0);

	constructor(private router:Router, private page:Page) {
		page.actionBarHidden = true;
	}

	ngOnInit() { 
		firebase.getCurrentUser()
		.then((user) => {	//TODO: make it nicer
			if (isUndefined(user)) {
				log(`User is undefined`);
				return;
			}

			this.currentUser = user;
			getAllSetsForUser(this.currentUser)
			.then((userSets:ELSet[]) => {
					this.userSets = userSets;

			}).catch((err) => {
				log(`${err}`);
				Toast.makeText(`${err} Try again.`);
			});

		}).catch((err) => {
			log(`Error occured during getting current user: ${err}`);
		});
	}

}