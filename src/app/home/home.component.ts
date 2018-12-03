import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'ui/page';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	title = 'easyLearn';

	constructor(private router:Router, private page:Page) {
		page.actionBarHidden = true;
	}

  	ngOnInit() { }

  	moveToSetsMenuComponent() {
	    this.router.navigate(["sets-menu"]);
	}

  	moveToAuthComponent() {
		this.router.navigate(["auth"]);
	}

}
