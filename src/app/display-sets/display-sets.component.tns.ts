import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
import { ELSetShortInfoInterface } from '../models/el-set-short-info';
import { FirebaseService } from '../services/firebase.service';
import { ChangeSetService } from '../services/change-set.service';
import { log } from '../logger/logger';


@Component({
    selector: 'display-sets',
    templateUrl: './display-sets.component.tns.html',
    styleUrls: ['./display-sets.component.tns.css']
})

export class DisplaySetsComponent {

    private userSets: ELSetShortInfoInterface[];

    constructor(private router: Router, private page: Page, private firebase: FirebaseService, private changeSetService: ChangeSetService) {
        page.actionBarHidden = true;
        this.userSets = this.firebase.user.getSets();
    }

    listItemTapped(setId: string) {
        this.changeSetService.displayLearningSet(setId);
    }
}
