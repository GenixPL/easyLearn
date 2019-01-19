import { isDefined } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Toast from 'nativescript-toast';
import { Page } from 'tns-core-modules/ui/page/page';
import { FirebaseService } from '~/app/services/firebase.service';
import { log } from '../logger/logger';
import { ELUser } from '../models/el-user';


@Component({
	selector: 'auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

	constructor(
		private router: Router,
		private page: Page,
		private firebase: FirebaseService
	) {
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
		await this.firebase.signOut();
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