import { Component, OnInit } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { Page } from 'tns-core-modules/ui/page/page';

import { createFilesForNewUser } from '../../../firebase-functions/create-user-files';
import { User } from 'nativescript-plugin-firebase';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { log } from '~/app/logger/logger';


@Component({
	selector: 'sign-in-email-password',
	templateUrl: './sign-in-email-password.component.html',
	styleUrls: ['./sign-in-email-password.component.css']
})

export class SignInEmailPasswordComponent implements OnInit {

	private email: string = "dupa@o2.pl";
	private password: string = "asdasdasd";
	private isUiEnabled: boolean = true;

	constructor(private page: Page, private location:Location) {
		page.actionBarHidden = true;
	}

	ngOnInit() { }

	async signInUser() { //TODO: make it more safe
		this.isUiEnabled = false;
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

		} catch (err) {
			console.log(`Error occured during email-password auth: ${err}`);
		}

		this.isUiEnabled = true;
		if (this.location.path() == 'sign-in-email-password') {
			this.location.back();
		}
	}
}