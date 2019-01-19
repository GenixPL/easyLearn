import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { FirebaseService } from '~/app/services/firebase.service';



@Component({
	selector: 'google-auth',
	templateUrl: './google-auth.component.html',
	styleUrls: ['./google-auth.component.css']
})

export class GoogleAuthComponent implements OnInit {

	private isUiEnabled: boolean = true;

	constructor(
		private page: Page,
		private location: Location,
		private firebase: FirebaseService
	) {
		page.actionBarHidden = true;
	}

	ngOnInit() { }

	async logInWithGoogle() {
		this.isUiEnabled = false;

		await this.firebase.googleAuth();

		this.isUiEnabled = true;

		if (this.location.path() == '/google-auth') {
			this.location.back();
		}
	}
}