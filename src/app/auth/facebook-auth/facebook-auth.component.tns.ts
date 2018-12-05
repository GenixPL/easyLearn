import { Component, OnInit } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { Page } from 'tns-core-modules/ui/page/page';


@Component({
	selector: 'facebook-auth',
	templateUrl: './facebook-auth.component.html',
	styleUrls: ['./facebook-auth.component.css']
})

export class FacebookAuthComponent implements OnInit {

	constructor(private page:Page) { 
		page.actionBarHidden = true;
	}

	ngOnInit() { }

	loginWithFacebook() {
		firebase.logout();

		firebase.login({
			type: firebase.LoginType.FACEBOOK,
			// Optional
			facebookOptions: {
			  // defaults to ['public_profile', 'email']
			  scope: ['public_profile', 'email']
			}
		  	}).then((user) => {
				JSON.stringify(`User logged in through facebook auth: ${JSON.stringify(user.email)}`);

			}, (err) => {
				console.log(`Error during facebook auth: ${err}`);
			});
	}

}