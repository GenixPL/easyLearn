import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'ui/page';
import * as firebase from 'nativescript-plugin-firebase/app';


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
	const Document = firebase.firestore().collection("public-sets").doc("nuZKAj9LHKV07fYAMvLc	");

	Document.get().then(doc => {
	  if (doc.exists) {
		console.log(`Document data: ${JSON.stringify(doc.data())}`);
	  } else {
		console.log("No such document!");
	  }
	});
  }

}