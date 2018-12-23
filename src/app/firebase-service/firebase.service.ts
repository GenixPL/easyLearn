import { Injectable, OnInit } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { AuthStateChangeListener, AuthStateData, firestore, User } from 'nativescript-plugin-firebase';
import * as Toast from 'nativescript-toast';
import { isUndefined } from 'util';
import { log } from '../logger/logger';
import { ELUser, ELUserInterface } from '../models/el-user';
import { ELSet, ELSetInterface } from '../models/el-set';
import { ELSetShortInfoInterface } from '../models/el-set-short-info';


@Injectable({
    providedIn: 'root',
})

export class FirebaseService implements OnInit {

    //TODO: enable change of password
    //TODO: inform about lack of the internet

    /* Publicly accesible object representing current user. */
    public user: ELUser;

    /* User returned from firebase auth. */
    private currentUser: User;

    /* Flag representing state of fireabse auth. */
    private isLoggedIn: boolean = false;

    /* Reference to users collection in firestore. */
    private readonly usersCollectionRef: firestore.CollectionReference = firebase.firestore.collection(`users`);

    /* Reference to private-sets collection in firestore. */
    private readonly privateSetsCollectionRef: firestore.CollectionReference = firebase.firestore.collection(`private-sets`);

    /* Reference to user's doc in firestore. */
    private userDocRef: firestore.DocumentReference;

    /* Function used to unsubscribe user's data fatches from firestore. */
    private unsubscribeUserDoc;

    constructor() { }

    async ngOnInit() {
        await this.initFirebase();
        if (this.isLoggedIn == true) {
            await this.subscribeForUserData();

        } else {
            //handle it somehow
        }
    }


    //INIT
    private async initFirebase() {
        try {
            await firebase.init();
            log(`+ firebase init`);

        } catch (err) {
            log(`- firebase init: ${err}`);
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


    //AUTH
    public async signUpByEmailPassword(email: string, password: string) {

        await this.signOut();

        try {
            let user: User = await firebase.createUser({
                email: email,
                password: password //TODO: add validation
            });
            log(`+ sign up user by email and password`);
            this.createFilesForNewUser(user);

        } catch (err) {
            log(`- sign up user by email and password: ${err}`);

            let errMassage: string = JSON.stringify(err);
            if (errMassage.includes("FirebaseAuthUserCollisionException")) {
                Toast.makeText(`ERROR: Account with the email: ${email} already exists.`, "long").show();
            } else {
                Toast.makeText(`ERROR: Some error occured during signing up, please try again.`, "long").show();
            }
        }
    }

    public async signInByEmailPassword(email: string, password: string) {

        await this.signOut();

        try {
            let user: User = await firebase.login({
                type: firebase.LoginType.PASSWORD,
                passwordOptions: {
                    email: email,
                    password: password
                }
            });
            log(`+ sign in user by email and password`);

        } catch (err) {
            log(`- sign in user by email and password: ${err}`);

            Toast.makeText(`ERROR: Some error occured during signing in, please try again.`, "long").show();
        }
    }

    public async signOut() {

        if (this.isLoggedIn == false) {
            log(`- sign out user: no signed in user`);
            return;
        }

        try {
            await firebase.logout();
            log(`+ sign out user`);

        } catch (err) {
            log(`- sign out user: ${err}`);
        }
    }

    public async facebookAuth() {

        await this.signOut();

        try {
            let user: User = await firebase.login({
                type: firebase.LoginType.FACEBOOK,
                facebookOptions: {
                    scope: ['email']
                }
            });

            if (user.additionalUserInfo.isNewUser) {
                this.createFilesForNewUser(user);
                log(`+ user signed up by facebook auth`);

            } else {
                log(`+ user signed in by facebook auth`);
            }

        } catch (err) {
            log(`- facebook auth: ${err}`);

            Toast.makeText(`ERROR: Some error occured during facebook authentication, please try again.`, "long").show();
        }
    }

    public async googleAuth() {

        await this.signOut();

        try {
            let user: User = await firebase.login({
                type: firebase.LoginType.GOOGLE
            });

            if (user.additionalUserInfo.isNewUser) {
                this.createFilesForNewUser(user);
                log(`+ user signed up by google auth`);

            } else {
                log(`- user signed in by google auth`);
            }

        } catch (err) {
            log(`- google auth: ${err}`);

            Toast.makeText(`ERROR: Some error occured during google authentication, please try again.`, "long").show();
        }
    }


    //FIRESTORE
    public async saveUserChanges() {
        try {
            await this.usersCollectionRef.doc(this.user.getUID()).set(this.user.toJSON());
            log(`+ save user changes`);

        } catch (err) {
            log(`- save user changes: ${err}`);
        }
    }

    private async subscribeForUserData() {
        if (this.isLoggedIn == false) {
            log(`- subscribe user document: user is not logged in`);
            return
        }

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

    /* Used only during signing up process. */
    private async createFilesForNewUser(user: User) {

        if (isUndefined(user)) {
            log(`- create files for new user: user is undefined`);
            return;
        }

        try {
            await this.createUserFile(user);
            await this.addSetToUser(ELSet.getSampleSetJSON());

            log(`+ create files for new user`);

        } catch (err) {
            log(`- create files for new user: ${err}`);
        }
    }

    /* Used only to create new user document for new user. */
    private async createUserFile(user: User) {
        const newUserJSON = ELUser.getNewUserJSON(user);

        try {
            await this.usersCollectionRef.doc(`${user.uid}`).set(newUserJSON);
            log(`+ create user file`);

        } catch (err) {
            log(`- create user file: ${err}`);
        }
    }

    public async addSetToUser(newSet: ELSetInterface) {
        try {
            newSet.document_id = await this.getIdForNewSet();
            await this.privateSetsCollectionRef.doc(newSet.document_id).set(newSet);

            let newSetShortInfo: ELSetShortInfoInterface = {
                set_name: newSet.set_name,
                document_id: newSet.document_id,
                language1: newSet.language1,
                language2: newSet.language2,
                created_date: newSet.created_date
            };
            this.user.addSet(newSetShortInfo);
            this.saveUserChanges();

            log(`+ add set to user`);

        } catch (err) {
            log(`- add set to user: ${err}`);
        }
    }

    private async getIdForNewSet(): Promise<string> {
        let doc;

        try {
            doc = await this.privateSetsCollectionRef.add({
                name: `temp for user: ${this.user.getUID()}`
            });
            log(`+ get new set id`);

        } catch (err) {
            log(`- get new set id: ${err}`);
        }

        return doc.id;
    }

}