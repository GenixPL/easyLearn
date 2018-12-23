import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
import { FirebaseService } from '~/app/firebase-service/firebase.service';
import { log } from '~/app/logger/logger';
import { ELSetShortInfoInterface } from '~/app/models/el-set-short-info';


@Component({
	selector: 'show-my-sets',
	templateUrl: './show-my-sets.component.html',
	styleUrls: ['./show-my-sets.component.css'],
})

export class ShowMySetsComponent {
	private userSets: ELSetShortInfoInterface[];

	constructor(
		private router: Router,
		private page: Page,
		private firebase: FirebaseService
	) {
		page.actionBarHidden = true;
		this.userSets = this.firebase.user.getSets();
	}

	pff(setId: string) {
		log(`holder: ${setId}`);
	}

}