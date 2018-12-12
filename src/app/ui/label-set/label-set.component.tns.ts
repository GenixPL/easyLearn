import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { isDefined } from '@angular/compiler/src/util';

import { ELSet } from '~/app/models/el-set';
import { log } from '~/app/logger/logger';


@Component({
	selector: 'label-set',
	templateUrl: './label-set.component.html',
	styleUrls: ['./label-set.component.css'],
})

export class LabelSetComponent {

	private setName: string;
	private image1: string;
	private image2: string;

	@Input('source')
	set source(set: ELSet) {
		log(`current name: ${this.setName}`);
		log(`new name:${isDefined(set) ? set.getSetName() : `un`}`);
		if (isDefined(set)) {
			this.setName = set.getSetName();
			this.image1 = `~/images/flags/flag-${set.getFirstLanguage().toLowerCase()}.png`;
			this.image2 = `~/images/flags/flag-${set.getSecondLanguage().toLowerCase()}.png`;
		}
		
	};

	constructor() {
	}

}