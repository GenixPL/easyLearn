import { Location } from '@angular/common';
import { isDefined } from '@angular/compiler/src/util';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as Toast from 'nativescript-toast';
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Page } from 'tns-core-modules/ui/page/page';
import { FirebaseService } from '~/app/services/firebase.service';
import { log } from '../logger/logger';
import { ELUser } from '../models/el-user';


@Component({
	selector: 'auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})

export class AuthComponent {

	private isUiEnabled: boolean = true;

	constructor(private router: Router, private page: Page, private firebase: FirebaseService, private location: Location) {
		page.actionBarHidden = true;
	}


	async signInWithEmailPassword() {
		dialogs.login("Please type in your email and password", "", "").then( async (r) => {
			if (r.result == false) {
				return;
			}

			this.isUiEnabled = false;
			try {
				await this.firebase.signInByEmailPassword(r.userName, r.password);

				this.isUiEnabled = true;

				Toast.makeText(`You are signed in.`, "long").show();

				if (this.location.path() == '/auth') {
					this.router.navigate(["home"]);
				}

			} catch (err) {
				this.isUiEnabled = true;

				let errMassage: string = JSON.stringify(err);
				if (errMassage.includes("FirebaseAuthInvalidUserException")) {
					Toast.makeText(`ERROR: No account with the email: ${r.userName} exists.`, "long").show();
				} else {
					Toast.makeText(`ERROR: Some error occured during signing in, please try again.`, "long").show();
				}
			}
		});
	}

	async signUpWithEmailPassword() {
		dialogs.login("Please type in your email and password", "", "").then(async (r) => {
			if (r.result == false) {
				return;
			}

			this.isUiEnabled = false;
			try {
				this.firebase.signUpByEmailPassword(r.userName, r.password); 

				this.isUiEnabled = true;

				Toast.makeText(`You are signed in.`, "long").show();

				if (this.location.path() == '/auth') {
					this.router.navigate(["home"]);
				}

			} catch (err) {
				this.isUiEnabled = true;

				let errMassage: string = JSON.stringify(err);
				if (errMassage.includes("FirebaseAuthUserCollisionException")) {
					Toast.makeText(`ERROR: Account with the email: ${r.userName} already exists.`, "long").show();
				} else {
					Toast.makeText(`ERROR: Some error occured during signing up, please try again.`, "long").show();
				}
			}
		});
	}

	async signInWithGoogle() {
		this.isUiEnabled = false;

		try {
			await this.firebase.googleAuth();

			this.isUiEnabled = true;

			Toast.makeText(`You are signed in.`, "long").show();

			if (this.location.path() == '/auth') {
				this.router.navigate(["home"]);
			}

		} catch (err) {
			this.isUiEnabled = true;

			Toast.makeText(`ERROR: Some error occured during Google authentication, please try again.`, "long").show();
		}
	}

	async signInWithFacebook() {
		this.isUiEnabled = false;

		try {
			await this.firebase.facebookAuth();

			this.isUiEnabled = true;

			Toast.makeText(`You are signed in.`, "long").show();

			if (this.location.path() == '/auth') {
				this.router.navigate(["home"]);
			}

		} catch (err) {
			this.isUiEnabled = true;

			Toast.makeText(`ERROR: Some error occured during Facebook authentication, please try again.`, "long").show();
		}


	}

	async signOut() {
		this.isUiEnabled = false;

		try {
			await this.firebase.signOut();

			this.isUiEnabled = true;

			Toast.makeText(`You are signed out.`, "long").show();

		} catch (err) {
			this.isUiEnabled = true;

			Toast.makeText(`ERROR: Some error occured during signing out, please try again.`, "long").show();
		}
	}


	async getCurrentUser() {
		let user: ELUser = this.firebase.user;

		if (isDefined(user)) {
			let userInfo: string = `user's uid:${user.getUID()} email:${user.getEmail()}`;

			Toast.makeText(`${userInfo}`, `long`).show();
			log(`${userInfo}`);

		} else {
			Toast.makeText(`user is undefined`, `long`).show();
			log(`- user is undefined`);
		}
	}
}