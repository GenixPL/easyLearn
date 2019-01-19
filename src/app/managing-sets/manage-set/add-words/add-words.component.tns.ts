import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Page} from 'tns-core-modules/ui/page/page';
import { ELSet } from '~/app/models/el-set';
import { ChangeSetService } from '~/app/services/change-set.service';
import { log } from '~/app/logger/logger';
import { Location } from '@angular/common';


@Component({
    selector: 'add-words',
    templateUrl: './add-words.component.tns.html',
    styleUrls: ['./add-words.component.tns.css'],
})

export class AddWordsComponent {

    private set: ELSet;
    private word1: string = "";
    private word2: string = "";

    constructor(private router: Router, private page: Page, private changeSetService: ChangeSetService, private location: Location) {
        page.actionBarHidden = true;
        this.set = changeSetService.currentSet;
    }

    addWords() {
        this.changeSetService.currentSet.addWords(this.word1, this.word2);
        this.location.back();
    }
}