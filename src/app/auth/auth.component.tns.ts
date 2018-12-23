import { isDefined } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'nativescript-plugin-firebase';
import { User } from 'nativescript-plugin-firebase';
import * as Toast from 'nativescript-toast';
import { Page } from 'tns-core-modules/ui/page/page';
import { FirebaseService } from '../firebase-service/firebase.service';


@Component({
	selector: 'auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

	constructor(private router: Router, private page: Page) {
		page.actionBarHidden = true;
	}

	ngOnInit() { }

	moveToSignInEmailPasswordComponent() {
		this.router.navigate(['sign-in-email-password']);
	}

	moveToSignUpEmailPasswordComponent() {
		this.router.navigate(['sign-up-email-password']);
	}

	moveToGoogleAuthComponent() {
		this.router.navigate(['google-auth']);
	}

	moveToFacebookAuthComponent() {
		this.router.navigate(['facebook-auth']);
	}

	async signOut() {
		try {
			await firebase.logout();
			console.log(`✔ log user out`);

		} catch (err) {
			console.log(`✘ log user out: ${err}`);
		}
	}

	async getCurrentUser() {
		try {
			let user: User = await firebase.getCurrentUser();

			if (isDefined(user)) {
				let userInfo: string = `${user.uid} ${user.email}`;

				Toast.makeText(`Current user: ${userInfo}`, `long`).show();
				console.log(`Current user: ${userInfo}`);

			} else {
				Toast.makeText(`Current user is undefined`, `long`).show();
				console.log(`Current user is undefined`);
			}

		} catch (err) {
			console.log(`Error during getting current user: ${err}`);
		}
	}
}