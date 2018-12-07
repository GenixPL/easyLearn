import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'nativescript-plugin-firebase';
import { Page } from 'tns-core-modules/ui/page/page';
import { log } from '~/app/logger/logger';
import { getSampleJSONSet, getSetFromJSON, ELSet, ELSetInterface } from '~/app/models/el-set';


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
		let json:ELSetInterface = getSampleJSONSet("sample");
		log(`json ${JSON.stringify(json)}`);
		let set:ELSet = getSetFromJSON(json);
		log(`set: ${set.getJSONString()}`);
	}


}