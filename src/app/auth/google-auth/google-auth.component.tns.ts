import { Component, OnInit } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { Page } from 'tns-core-modules/ui/page/page';

import { createFilesForNewUser } from '../../firebase-functions/create-user-files';


@Component({
	selector: 'google-auth',
	templateUrl: './google-auth.component.html',
	styleUrls: ['./google-auth.component.css']
})

export class GoogleAuthComponent implements OnInit {

	constructor(private page:Page) { 
		page.actionBarHidden = true;
	}

	ngOnInit() { }

	logInWithGoogle() { //TODO:block ui until return
		firebase.logout();

		firebase.login({
			type: firebase.LoginType.GOOGLE

		}).then((user) => {
			console.log(`User logged in through google auth: ${JSON.stringify(user.email)}`);
			if (user.additionalUserInfo.isNewUser) {
				createFilesForNewUser(user);
			}

		}).catch((err) => {
			console.log(`Error occured during google auth: ${err}`);
		});
	}
}