import { Component, OnInit } from '@angular/core';
import { Page } from 'ui/page';
import * as firebase from 'nativescript-plugin-firebase/app';
import { Router } from '@angular/router';


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
}