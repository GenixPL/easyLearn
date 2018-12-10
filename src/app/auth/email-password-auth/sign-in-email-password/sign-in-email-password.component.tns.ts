import { Component, OnInit } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { Page } from 'tns-core-modules/ui/page/page';

import { createFilesForNewUser } from '../../../firebase-functions/create-user-files';
import { User } from 'nativescript-plugin-firebase';


@Component({
	selector: 'sign-in-email-password',
	templateUrl: './sign-in-email-password.component.html',
	styleUrls: ['./sign-in-email-password.component.css']
})

export class SignInEmailPasswordComponent implements OnInit {

	private email: string = "dupa@o2.pl";
	private password: string = "asdasdasd";
	private isProcessing:boolean = false;

	constructor(private page: Page) {
		page.actionBarHidden = true;
	}

	ngOnInit() { }

	async signInUser() { //TODO: make it more safe
		this.isProcessing = true;
		firebase.logout();

		try {
			let user: User = await firebase.login({
				type: firebase.LoginType.PASSWORD,
				passwordOptions: {
					email: this.email,
					password: this.password
				}
			});
			console.log(`User logged in through email-password auth: ${user.uid}`);
			
		} catch(err) {
			console.log(`Error occured during email-password auth: ${err}`);
		}

		this.isProcessing = false;
	}
}