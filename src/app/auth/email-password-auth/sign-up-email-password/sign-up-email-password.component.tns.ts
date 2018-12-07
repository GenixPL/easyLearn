import { Component, OnInit } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import * as Toast from 'nativescript-toast';
import { Page } from 'tns-core-modules/ui/page/page';

import { createFilesForNewUser } from '../../../firebase-functions/create-user-files';


@Component({
	selector: 'sign-up-email-password',
	templateUrl: './sign-up-email-password.component.html',
	styleUrls: ['./sign-up-email-password.component.css']
})

export class SignUpEmailPasswordComponent implements OnInit {

	private email: string = "ciekaw@o2.pl";
	private password: string = "asdasdasd";

	constructor(private page:Page) { 
		page.actionBarHidden = true;
	}

	ngOnInit() { }
	  
	signUpNewUser() { //TODO: make it more safe
		firebase.createUser({
		  	email: this.email,
		  	password: this.password

		}).then((user) => {
			console.log(`New user created through emial-password auth: ${JSON.stringify(user)}`);
			createFilesForNewUser(user);

		}).catch((err) => {
			console.log(`Error occured during user creation with email-password auth: ${err}`);

			let errMassage:string = JSON.stringify(err);
			if (errMassage.includes("FirebaseAuthUserCollisionException")) {
    			Toast.makeText(`ERROR: Account with the mail: ${this.email} already exists.`, "long").show();
			}
		});
	}

}