import { Component } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';


firebase
	.init({
		onAuthStateChanged: function(data) {
			if (data.user != undefined) {
				if (data.loggedIn) {
			  		console.log(`${data.user.email} logged in`);
				} else {
					console.log(`${data.user.email} logged out`);
				}
			}
		}
	})
	.then(() => {
		console.log('Firebase initialized.');
	})
	.catch((err) => {
		console.log(`Firebase initialisation error: ${err}`);
	}) 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
}