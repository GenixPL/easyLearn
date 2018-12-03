import { Component, OnInit } from '@angular/core';
import { Page } from 'ui/page';
import * as firebase from 'nativescript-plugin-firebase/app';
import * as Toast from 'nativescript-toast';


@Component({
	selector: 'sign-in-email-password',
	templateUrl: './sign-in-email-password.component.html',
	styleUrls: ['./sign-in-email-password.component.css']
})

export class SignInEmailPasswordComponent implements OnInit {

	private email: string = "dupa@o2.pl";
	private password: string = "gfhffgh";

	constructor(private page:Page) { 
		page.actionBarHidden = true;
	}

	ngOnInit() { }
	  
	signInUser() { //TODO: make it more safe
		firebase
			.auth().signInWithEmailAndPassword(this.email, this.password)
			.then((result) => { //here may be no return
				console.log(`User signed in ${result}`); 
			})
			.catch((err) => {
				let errMassage:string = JSON.stringify(err);
				console.log("User signing error: " + errMassage);
			});
	}

}