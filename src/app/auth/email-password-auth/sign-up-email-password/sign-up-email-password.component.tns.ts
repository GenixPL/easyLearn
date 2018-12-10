import { Component, OnInit } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import * as Toast from 'nativescript-toast';
import { Page } from 'tns-core-modules/ui/page/page';

import { createFilesForNewUser } from '../../../firebase-functions/create-user-files';
import { User } from 'nativescript-plugin-firebase';
import { Location } from '@angular/common';


@Component({
	selector: 'sign-up-email-password',
	templateUrl: './sign-up-email-password.component.html',
	styleUrls: ['./sign-up-email-password.component.css']
})

export class SignUpEmailPasswordComponent implements OnInit {

	private email: string = "ciekaw@o2.pl";
	private password: string = "asdasdasd";
	private isUiEnabled: boolean = true;

	constructor(private page: Page, private location: Location) {
		page.actionBarHidden = true;
	}

	ngOnInit() { }

	async signUpNewUser() { //TODO: make it more safe
		this.isUiEnabled = false;
		firebase.logout();

		try {
			let user: User = await firebase.createUser({
				email: this.email,
				password: this.password
			});
			console.log(`New user created through emial-password auth: ${JSON.stringify(user)}`);
			createFilesForNewUser(user);

			if (this.location.path() == 'sign-up-email-password') {
				this.location.back();
			}

		} catch (err) {
			console.log(`Error occured during user creation with email-password auth: ${err}`);

			let errMassage: string = JSON.stringify(err);
			if (errMassage.includes("FirebaseAuthUserCollisionException")) {
				Toast.makeText(`ERROR: Account with the mail: ${this.email} already exists.`, "long").show();
			}
		}

		this.isUiEnabled = true;
	}

}