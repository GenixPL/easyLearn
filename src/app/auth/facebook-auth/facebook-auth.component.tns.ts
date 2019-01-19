import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { FirebaseService } from '~/app/services/firebase.service';



@Component({
	selector: 'facebook-auth',
	templateUrl: './facebook-auth.component.html',
	styleUrls: ['./facebook-auth.component.css']
})

export class FacebookAuthComponent implements OnInit {

	private isUiEnabled: boolean = true;

	constructor(
		private page: Page,
		private location: Location,
		private firebase: FirebaseService
	) {
		page.actionBarHidden = true;
	}

	ngOnInit() { }

	async loginWithFacebook() {
		this.isUiEnabled = false;

		await this.firebase.facebookAuth();

		if (this.location.path() == '/facebook-auth') {
			this.location.back();
		}

		this.isUiEnabled = true;
	}

}