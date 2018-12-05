import { Component, OnInit } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { Page } from 'tns-core-modules/ui/page/page';


@Component({
	selector: 'google-auth',
	templateUrl: './google-auth.component.html',
	styleUrls: ['./google-auth.component.css']
})

export class GoogleAuthComponent implements OnInit {

	constructor(private page:Page) { 
		page.actionBarHidden = true;
	}

	ngOnInit() { }

	logInWithGoogle() { //TODO:make it more safe //TODO:block ui until return
		firebase.logout();

		firebase.login({ //it may not co-work with web 
			type: firebase.LoginType.GOOGLE,
		}).then((user) => {
			console.log(`User logged in through google auth: ${JSON.stringify(user.email)}`);

		}).catch((err) => {
			console.log(`Error during google auth: ${err}`);
		});
	}
}