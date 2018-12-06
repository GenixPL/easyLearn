import { Component, OnInit } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { Page } from 'tns-core-modules/ui/page/page';

import { createFilesForNewUser } from '../../firebase-auth-functions/create-user-files';


@Component({
	selector: 'sign-in-email-password',
	templateUrl: './sign-in-email-password.component.html',
	styleUrls: ['./sign-in-email-password.component.css']
})

export class SignInEmailPasswordComponent implements OnInit {

	private email: string = "dupa@o2.pl";
	private password: string = "asdasdasd";

	constructor(private page:Page) { 
		page.actionBarHidden = true;
	}

	ngOnInit() { }
	  
	signInUser() { //TODO: make it more safe //TODO:block ui until return
		firebase.logout();

		firebase.login({
			type: firebase.LoginType.PASSWORD,
			passwordOptions: {
				email: this.email,
				password: this.password
			}
	
		}).then((user) => {
			console.log(`User logged in through email-password auth: ${user}`);
			
		}).catch((err) => {
			console.log(`Error occured during email-password auth: ${err}`);
		});	
	}

}