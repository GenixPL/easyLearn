import { Component, OnInit } from '@angular/core';
import { Page } from 'ui/page';
import * as firebase from 'nativescript-plugin-firebase';


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

	onGoogleLogin() {
		firebase.login({ //it may not co-work with web 
			type: firebase.LoginType.GOOGLE,
		}).then(res => {
			console.log(JSON.stringify(res));
		}).catch(err => {
			console.log(err);
		})
	}
}