import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';


@Component({
	selector: 'market',
	templateUrl: './market.component.html',
	styleUrls: ['./market.component.css']
})

export class MarketComponent implements OnInit {

	constructor(private router: Router, private page: Page) {
		page.actionBarHidden = true;
	}

	ngOnInit() { }

	getDoc() {
	}
}