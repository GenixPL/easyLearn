import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'nativescript-plugin-firebase/app';
import { Page } from 'tns-core-modules/ui/page/page';
import { log } from '~/app/logger/logger';


@Component({
  selector: 'market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})

export class MarketComponent implements OnInit {

  	constructor(private router:Router, private page:Page) { 
    	page.actionBarHidden = true;
  	}

  	ngOnInit() { }

  	getDoc() {
		log(`asdas`);
		console.log(`console log`);
	}

}