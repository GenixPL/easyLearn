import { Injectable } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { ELSet } from '../models/el-set';
import { ELUser, ELUserInterface } from '../models/el-user';
import { User, AuthStateChangeListener, AuthStateData, firestore } from 'nativescript-plugin-firebase';
import { userInfo } from 'os';
import { log } from '../logger/logger';


@Injectable({
    providedIn: 'root',
})

export class FirebaseService {

    //TODO: enable change of password
    //TODO: inform about lack of the internet

    /* Publicly accesible object representing current user. */
    public user: ELUser;

    /* User returned from firebase auth. */
    private currentUser: User;

    /* Flag representing state of fireabse auth. */
    private isLoggedIn: boolean = false;

    /* Reference to user's doc in firestore. */
    private userDocRef: firestore.DocumentReference;

    /* Function used to unsubscribe user's data fatches from firestore. */
    private unsubscribeUserDoc;

    constructor() {
        this.initFirebase();
        if (this.isLoggedIn == true) {
           this.subscribeForUserData();
        }
    }

    public async saveUserChanges() {
        
    }

    async initFirebase() {
        try {
            let promise: any = await firebase.init();

        } catch (err) {
            console.log(`Firebase initialisation error: ${err}`);
            //TODO: react somehow to this
            this.isLoggedIn = false;
            return
        }

        let listener: AuthStateChangeListener = {
            onAuthStateChanged: (userData: AuthStateData) => {
                if (userData.loggedIn) {
                    this.currentUser = userData.user;
                    this.isLoggedIn = true;
                    console.log(`+ user logged in`);

                } else {
                    this.currentUser = null;
                    this.isLoggedIn = false;
                    console.log(`+ user logged out`);
                }
            }
        };
        firebase.addAuthStateListener(listener);
    }

    async subscribeForUserData() {
        try {
            this.userDocRef = await firestore.collection(`users`).doc(`${this.currentUser.uid}`);
            this.unsubscribeUserDoc = this.userDocRef.onSnapshot((doc) => {
                if (doc.exists) {
                    this.user = new ELUser(<ELUserInterface>doc.data());
                    log(`+ user data fetch from firestore`);

                } else {
                    log(`- user data fetch from firestore: such document doesn't exist`);
                }
            });
            log(`+ subscribe user document`);

        } catch (err) {
            log(`- subscribe user document: ${err}`);
        }
    }

}