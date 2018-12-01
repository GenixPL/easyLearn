import { Component } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';


firebase
	.init()
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
