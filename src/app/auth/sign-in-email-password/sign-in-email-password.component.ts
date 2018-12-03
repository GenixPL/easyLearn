import { Component, OnInit } from '@angular/core';
import { Page } from 'ui/page';
import * as firebase from 'nativescript-plugin-firebase/app';


@Component({
	selector: 'sign-in-email-password',
	templateUrl: './sign-in-email-password.component.html',
	styleUrls: ['./sign-in-email-password.component.css']
})

export class SignInEmailPasswordComponent implements OnInit {

	constructor(private page:Page) { 
		page.actionBarHidden = true;

		firebase
			.auth().signInWithEmailAndPassword('dupa@gmail.com', 'firebase')
			.then(() => console.log("User logged in"))
    		.catch(err => console.log("Login error: " + JSON.stringify(err)));
	}

  	ngOnInit() { }

}