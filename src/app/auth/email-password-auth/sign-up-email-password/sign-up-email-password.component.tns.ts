import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { FirebaseService } from '~/app/firebase-service/firebase.service';



@Component({
	selector: 'sign-up-email-password',
	templateUrl: './sign-up-email-password.component.html',
	styleUrls: ['./sign-up-email-password.component.css']
})

export class SignUpEmailPasswordComponent implements OnInit {

	private email: string = "ciekaw@o2.pl";
	private password: string = "asdasdasd";
	private isUiEnabled: boolean = true; //TODO:it throws some fucking error, but still works (and only sometimes on emulator)

	constructor(
		private page: Page, 
		private location: Location,
		private firebase: FirebaseService	
	) {
		page.actionBarHidden = true;
	}

	ngOnInit() { }

	async signUpNewUser() { //TODO: make it more safe
		this.isUiEnabled = false;

		this.firebase.signUpByEmailPassword(this.email, this.password);

		this.isUiEnabled = true;

		if (this.location.path() == '/sign-up-email-password') {
			this.location.back();
		}
	}

}