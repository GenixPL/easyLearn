import { Component, OnInit } from '@angular/core';
import { Page } from 'ui/page';
import * as firebase from 'nativescript-plugin-firebase/app';
import { Router } from '@angular/router';
import * as Toast from 'nativescript-toast';
import { User } from 'nativescript-plugin-firebase';
import { isDefined } from '@angular/compiler/src/util';


@Component({
	selector: 'auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

	constructor(private router:Router, private page:Page) { 
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

	signOut() {
		firebase.auth().signOut()
      		.then(() => console.log("Logout OK"))
      		.catch(error => console.log("Logout error: " + JSON.stringify(error)));
	}

	getCurrentUser() {
		const user = firebase.auth().currentUser;

		if (isDefined(user)) {
			let userInfo: string = `${user.uid} ${user.email}`;

			Toast.makeText(`Current user: ${userInfo}`, `long`).show();
			console.log(`Current user: ${userInfo}`);
			
		} else {
			Toast.makeText(`Current user is undefined`, `long`).show(); //TODO: sth is wrong and users are not save over sessions
			console.log(`Current user is undefined`);
		}
	}
}