import { Component, OnInit, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
import { FirebaseService } from '../services/firebase.service';
import { log } from '../logger/logger';
import { delay } from 'q';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})

export class HomeComponent {

	isUiEnabled: boolean = false;
	loggedUser: string;

	constructor(private router: Router, private page: Page, private ngZone: NgZone, private firebase: FirebaseService) {
		page.actionBarHidden = true;

		this.page.on("navigatedTo", async () => {
			await this.checkIfUserIsLoggedIn();
		});
	}

	async checkIfUserIsLoggedIn() {
		if (this.firebase.user === undefined) {
			this.isUiEnabled = false;
			this.router.navigate(["auth"]);

		} else {
			this.isUiEnabled = true;
			this.loggedUser = this.firebase.user.getEmail();
		}
	}

	moveToSetsMenuComponent() {
		this.router.navigate(["sets-menu"]);
	}

	moveToAuthComponent() {
		this.router.navigate(["auth"]);
	}

}