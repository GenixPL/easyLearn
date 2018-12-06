import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';

 
@Component({
  selector: 'show-my-sets',
  templateUrl: './show-my-sets.component.html',
  styleUrls: ['./show-my-sets.component.css'],
})

export class ShowMySetsComponent implements OnInit {

	constructor(private router:Router, private page:Page) {
		page.actionBarHidden = true;
	}

	ngOnInit() { }

}