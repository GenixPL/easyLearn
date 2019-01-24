import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { isDefined } from '@angular/compiler/src/util';

import { ELSet } from '~/app/models/el-set';
import { log } from '~/app/logger/logger';
import { ELSetShortInfoInterface } from '~/app/models/el-set-short-info';


@Component({
	selector: 'listView-sets',
	templateUrl: './listView-sets.component.html',
	styleUrls: ['./listView-sets.component.css'],
})

export class ListViewSetsComponent {
	private sets: DisplayedInfo[] = new Array(0);

	@Input('source')
	set source(sets: ELSetShortInfoInterface[]) {
		if (isDefined(sets)) {
			sets.forEach(set => {
				let newSet:DisplayedInfo = {
					setName: set.set_name,
					image1: `~/images/flags/flag-${set.language1.toLowerCase()}.png`,
					image2: `~/images/flags/flag-${set.language2.toLowerCase()}.png`,
					setId: set.document_id
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