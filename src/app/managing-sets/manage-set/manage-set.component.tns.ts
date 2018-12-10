import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';

 
@Component({
  selector: 'manage-set',
  templateUrl: './manage-set.component.html',
  styleUrls: ['./manage-set.component.css'],
})

export class ManageSetComponent implements OnInit {

	constructor(private router:Router, private page:Page) {
		page.actionBarHidden = true;
	}

	ngOnInit() { 
	}

	saveSet() {
		
	}

}