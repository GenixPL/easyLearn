import { Component, OnInit } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { Page } from 'tns-core-modules/ui/page/page';

import { createFilesForNewUser } from '../../firebase-functions/create-user-files';
import { User } from 'nativescript-plugin-firebase';


@Component({
	selector: 'facebook-auth',
	templateUrl: './facebook-auth.component.html',
	styleUrls: ['./facebook-auth.component.css']
})

export class FacebookAuthComponent implements OnInit {

	constructor(private page: Page) {
		page.actionBarHidden = true;
	}

	ngOnInit() { }

	async loginWithFacebook() { //TODO:block ui until return
		firebase.logout();

		try {
			let user: User = await firebase.login({
				type: firebase.LoginType.FACEBOOK,
				facebookOptions: {
					scope: ['email']
				}
			});

			JSON.stringify(`User logged in through facebook auth: ${JSON.stringify(user.email)}`);
			if (user.additionalUserInfo.isNewUser) {
				createFilesForNewUser(user);
			}
			
		} catch(err) {
			console.log(`Error occured during facebook auth: ${err}`);
		}
	}

}