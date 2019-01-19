import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { FirebaseService } from '~/app/services/firebase.service';



@Component({
	selector: 'sign-in-email-password',
	templateUrl: './sign-in-email-password.component.html',
	styleUrls: ['./sign-in-email-password.component.css']
})

export class SignInEmailPasswordComponent implements OnInit {

	private email: string = "dupa@o2.pl";
	private password: string = "asdasdasd";
	private isUiEnabled: boolean = true;

	constructor(
		private page: Page, 
		private location:Location,
		private firebase:FirebaseService	
	) {
		page.actionBarHidden = true;
	}

	ngOnInit() { }

	async signInUser() {
		this.isUiEnabled = false;

		await this.firebase.signInByEmailPassword(this.email, this.password);

		this.isUiEnabled = true;

		if (this.location.path() == '/sign-in-email-password') {
			this.location.back();
		}
	}
}