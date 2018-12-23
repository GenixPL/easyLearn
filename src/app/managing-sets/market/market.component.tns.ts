import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';

import { log } from '~/app/logger/logger';
import { FirebaseService } from '~/app/firebase-service/firebase.service';


@Component({
	selector: 'market',
	templateUrl: './market.component.html',
	styleUrls: ['./market.component.css']
})

export class MarketComponent implements OnInit {

	processing = false;

	constructor(private router: Router, private page: Page, private firebase:FirebaseService) {
		page.actionBarHidden = true;
	}

	ngOnInit() { }

	getDoc() {
	}
}