import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
import { ELSetShortInfoInterface } from '~/app/models/el-set-short-info';
import { FirebaseService } from '~/app/services/firebase.service';
import { ChangeSetService } from '~/app/services/change-set.service';
import { log } from '~/app/logger/logger';
import { ELSet } from '~/app/models/el-set';


@Component({
    selector: 'display-set',
    templateUrl: './display-set.component.tns.html',
    styleUrls: ['./display-set.component.tns.css']
})

export class DisplaySetComponent {
    private set: ELSet;
    private counter: number = -1;
    private currentWord1: string = "Click \"NEXT\" to start.";
    private currentWord2: string = "";
    private btnText: string = "NEXT";

    constructor(private router: Router, private page: Page, private firebase: FirebaseService, private changeSetService: ChangeSetService) {
        page.actionBarHidden = true;
        this.set = changeSetService.currentSet;
    }

    moveToNextWord() {
        if (this.btnText == "NEXT") {
            this.counter++;

            if (this.counter >= this.set.getWords().length) {
                this.currentWord1 = "This set has ended.";
                this.currentWord2 = "";
                this.btnText = "GO BACK";

            } else {
                this.currentWord1 = this.set.getWords()[this.counter].word1;
                this.currentWord2 = "";

                this.btnText = "SHOW TRANSLATION";
            }

        } else if (this.btnText == "SHOW TRANSLATION") {
            this.currentWord2 = this.set.getWords()[this.counter].word2;
            this.btnText = "NEXT";

        } else if (this.btnText == "GO BACK"){
            this.router.navigate(["home"]);
        }


    }

}
