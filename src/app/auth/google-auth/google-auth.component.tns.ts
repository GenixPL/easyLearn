import { Component, OnInit } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { Page } from 'tns-core-modules/ui/page/page';

import { createFilesForNewUser } from '~/app/firebase-service/create-user-files';
import { User } from 'nativescript-plugin-firebase';
import { Location } from '@angular/common';


@Component({
	selector: 'google-auth',
	templateUrl: './google-auth.component.html',
	styleUrls: ['./google-auth.component.css']
})

export class GoogleAuthComponent implements OnInit {

	private isUiEnabled: boolean = true;

	constructor(private page: Page, private location:Location) {
		page.actionBarHidden = true;
	}

	ngOnInit() { }

	async logInWithGoogle() {
		this.isUiEnabled = false;
		firebase.logout();

		try {
			let user: User = await firebase.login({
				type: firebase.LoginType.GOOGLE
			});

			console.log(`User logged in through google auth: ${JSON.stringify(user.email)}`);
			if (user.additionalUserInfo.isNewUser) {
				createFilesForNewUser(user);
			}

			if (this.location.path() == '/google-auth') {
				this.location.back();
			}

		} catch (err) {
			console.log(`Error occured during google auth: ${err}`);
		}

		this.isUiEnabled = true;
	}
}