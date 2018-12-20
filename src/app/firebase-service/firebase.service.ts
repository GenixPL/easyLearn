import { Injectable } from '@angular/core';
import { log } from '../logger/logger';


@Injectable({
    providedIn: 'root',
})

export class FirebaseService {

    constructor() {
        
    }

    getString():string { return "DUPAAA"; }

}