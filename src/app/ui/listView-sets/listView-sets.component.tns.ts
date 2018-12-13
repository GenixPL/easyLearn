import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { isDefined } from '@angular/compiler/src/util';

import { ELSet } from '~/app/models/el-set';
import { log } from '~/app/logger/logger';


@Component({
	selector: 'listView-sets',
	templateUrl: './listView-sets.component.html',
	styleUrls: ['./listView-sets.component.css'],
})

export class ListViewSetsComponent {
	private sets: DisplayedInfo[] = new Array(0);

	@Input('source')
	set source(sets: ELSet[]) {
		if (isDefined(sets)) {
			sets.forEach(set => {
				let newSet:DisplayedInfo = {
					setName: set.getSetName(),
					image1: `~/images/flags/flag-${set.getFirstLanguage().toLowerCase()}.png`,
					image2: `~/images/flags/flag-${set.getSecondLanguage().toLowerCase()}.png`,
					setId: set.getDocumentId()
				};
				this.sets.push(newSet);
			});
		}
	};

	@Output() getSetIdOnTap: EventEmitter<string> = new EventEmitter<string>();

	constructor() {
	}

	getSetId(item: DisplayedInfo) { //TODO: animate
		this.getSetIdOnTap.emit(item.setId);
	}
}

interface DisplayedInfo {
	setName: string,
	image1: string,
	image2: string,
	setId: string
}