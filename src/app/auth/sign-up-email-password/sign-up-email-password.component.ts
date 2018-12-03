import { Component, OnInit, NgModule } from '@angular/core';
import { Page } from 'ui/page';
import * as firebase from 'nativescript-plugin-firebase/app';
import * as Toast from 'nativescript-toast';

import { addSetsCollectionForUser } from '../../firebase/firebase-functions'


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
		firebase
			.auth().createUserWithEmailAndPassword(this.email, this.password)
			.then((newUser) => {
				console.log(`User created ${newUser}`);
				addSetsCollectionForUser(newUser.uid);
			})
			.catch((err) => {
				let errMassage:string = JSON.stringify(err);
				console.log("User creation error: " + errMassage);

				if (errMassage.includes("FirebaseAuthUserCollisionException")) {
    				Toast.makeText(`ERROR: Account with the mail: ${this.email} already exists.`, "long").show();
				}
			});
	}

}