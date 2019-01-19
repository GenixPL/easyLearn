import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
import { FirebaseService } from '../services/firebase.service';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
	title = 'easyLearn';
	private loggedUser: string;

	constructor(private router: Router, private page: Page, private firebase: FirebaseService) {
		page.actionBarHidden = true;
	}

	ngOnInit() {
		if (this.firebase.user == undefined) {
			this.router.navigate(["auth"]);
			
		} else {
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