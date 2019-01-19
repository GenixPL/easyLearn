import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
import { FirebaseService } from '~/app/services/firebase.service';
import { log } from '~/app/logger/logger';
import { ELSetShortInfoInterface } from '~/app/models/el-set-short-info';
import { ChangeSetService } from '~/app/services/change-set.service';


@Component({
	selector: 'show-my-sets',
	templateUrl: './show-my-sets.component.html',
	styleUrls: ['./show-my-sets.component.css'],
})

export class ShowMySetsComponent implements OnInit {
	private userSets: ELSetShortInfoInterface[];

	constructor(
		private router: Router,
		private page: Page,
		private firebase: FirebaseService,
		private changeSetService: ChangeSetService
	) {
		page.actionBarHidden = true;
	}

	ngOnInit() {
		this.userSets = this.firebase.user.getSets();
	}

	listItemTapped(setId: string) {
		this.changeSetService.displayManagingSet(setId);
	}

}