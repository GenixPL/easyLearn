import { Component, OnInit } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { Page } from 'tns-core-modules/ui/page/page';

import { createFilesForNewUser } from '../../firebase-functions/create-user-files';
import { User } from 'nativescript-plugin-firebase';


@Component({
	selector: 'google-auth',
	templateUrl: './google-auth.component.html',
	styleUrls: ['./google-auth.component.css']
})

export class GoogleAuthComponent implements OnInit {

	constructor(private page: Page) {
		page.actionBarHidden = true;
	}

	ngOnInit() { }

	async logInWithGoogle() { //TODO:block ui until return
		firebase.logout();

		try {
			let user: User = await firebase.login({
				type: firebase.LoginType.GOOGLE

			});

			console.log(`User logged in through google auth: ${JSON.stringify(user.email)}`);
			if (user.additionalUserInfo.isNewUser) {
				createFilesForNewUser(user);
			}
			
		} catch(err) {
			console.log(`Error occured during google auth: ${err}`);
		}
	}
}