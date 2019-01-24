import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ELSet } from '../models/el-set';
import { FirebaseService } from './firebase.service';


@Injectable({
    providedIn: 'root',
})


export class ChangeSetService {

    public currentSet: ELSet;

    constructor(
        private router: Router,
        private location: Location,
        private firebase: FirebaseService
    ) {
    }

    public async displayManagingSet(setId: string) {
        this.currentSet = await this.firebase.getSetById(setId);
        this.router.navigate(["manage-set"]);
    }

    public async displayLearningSet(setId: string) {
        this.currentSet = await this.firebase.getSetById(setId);
        this.router.navigate(["display-set"]);
    }

    public async saveSet(set: ELSet) {
        this.currentSet = undefined;
        this.firebase.saveSetChanges(set);
        this.location.back();
    }

}