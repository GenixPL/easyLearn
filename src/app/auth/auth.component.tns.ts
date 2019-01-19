import { isDefined } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Toast from 'nativescript-toast';
import { Page } from 'tns-core-modules/ui/page/page';
import { FirebaseService } from '~/app/services/firebase.service';
import { log } from '../logger/logger';
import { ELUser } from '../models/el-user';
import { Location } from '@angular/common';
import { HomeComponent } from '../home/home.component.tns';


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
		this.isUiEnabled = false;

		let email: string = "dupjhfgjha@o2.pl";
		let password: string = "asdasdasd";

		try {
			await this.firebase.signInByEmailPassword(email, password); this.isUiEnabled = true;

			this.isUiEnabled = true;

			Toast.makeText(`You are signed in.`, "long").show();

			if (this.location.path() == '/auth') {
				this.router.navigate(["home"]);
			}

		} catch (err) {
			this.isUiEnabled = true;

			let errMassage: string = JSON.stringify(err);
			if (errMassage.includes("FirebaseAuthInvalidUserException")) {
				Toast.makeText(`ERROR: No account with the email: ${email} exists.`, "long").show();
			} else {
				Toast.makeText(`ERROR: Some error occured during signing in, please try again.`, "long").show();
			}
		}
	}

	async signUpWithEmailPassword() {
		this.isUiEnabled = false;

		let email: string = "dupa@o2.pl";
		let password: string = "asdasdasd";

		try {
			this.firebase.signUpByEmailPassword(email, password);

			this.isUiEnabled = true;

			Toast.makeText(`You are signed in.`, "long").show();

			if (this.location.path() == '/auth') {
				this.router.navigate(["home"]);
			}

		} catch (err) {
			this.isUiEnabled = true;

			let errMassage: string = JSON.stringify(err);
			if (errMassage.includes("FirebaseAuthUserCollisionException")) {
				Toast.makeText(`ERROR: Account with the email: ${email} already exists.`, "long").show();
			} else {
				Toast.makeText(`ERROR: Some error occured during signing up, please try again.`, "long").show();
			}
		}
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