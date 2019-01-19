import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
import { ELSet } from '~/app/models/el-set';
import { ChangeSetService } from '~/app/services/change-set.service';


@Component({
	selector: 'manage-set',
	templateUrl: './manage-set.component.html',
	styleUrls: ['./manage-set.component.css'],
})

export class ManageSetComponent {

	private set: ELSet;

	constructor(
		private router: Router,
		private page: Page,
		private changeSetService: ChangeSetService
	) {
		page.actionBarHidden = true;
		this.set = changeSetService.getCurrentSet();
	}

	saveSet() {
		this.changeSetService.saveSet(this.set);
	}

}