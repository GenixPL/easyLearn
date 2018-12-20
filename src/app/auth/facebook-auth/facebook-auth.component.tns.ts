import { Component, OnInit } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { Page } from 'tns-core-modules/ui/page/page';

import { createFilesForNewUser } from '~/app/firebase-service/create-user-files';
import { User } from 'nativescript-plugin-firebase';
import { Location } from '@angular/common';


@Component({
	selector: 'facebook-auth',
	templateUrl: './facebook-auth.component.html',
	styleUrls: ['./facebook-auth.component.css']
})

export class FacebookAuthComponent implements OnInit {

	private isUiEnabled:boolean = true;

	constructor(private page: Page, private location:Location) {
		page.actionBarHidden = true;
	}

	ngOnInit() { }

	async loginWithFacebook() {
		this.isUiEnabled = false;
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
			
			if (this.location.path() == '/facebook-auth') {
				this.location.back();
			}
			
		} catch(err) {
			console.log(`Error occured during facebook auth: ${err}`);
		}

		this.isUiEnabled = true;
	}

}