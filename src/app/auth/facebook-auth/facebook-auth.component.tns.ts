import { Component, OnInit } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { Page } from 'tns-core-modules/ui/page/page';

import { createFilesForNewUser } from '../firebase-auth-functions/create-user-files';


@Component({
	selector: 'facebook-auth',
	templateUrl: './facebook-auth.component.html',
	styleUrls: ['./facebook-auth.component.css']
})

export class FacebookAuthComponent implements OnInit {

	constructor(private page:Page) { 
		page.actionBarHidden = true;
	}

	ngOnInit() { }

	loginWithFacebook() { //TODO:block ui until return
		firebase.logout();

		firebase.login({
			type: firebase.LoginType.FACEBOOK,
			facebookOptions: { // Optional
			  scope: ['email']
			}

		}).then((user) => {
			JSON.stringify(`User logged in through facebook auth: ${JSON.stringify(user.email)}`);
			if (user.additionalUserInfo.isNewUser) {
				createFilesForNewUser(user);
			}

		}, (err) => {
			console.log(`Error occured during facebook auth: ${err}`);
		});
	}

}