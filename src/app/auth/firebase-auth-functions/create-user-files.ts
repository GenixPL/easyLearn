import * as firebase from 'nativescript-plugin-firebase';
import { User } from 'nativescript-plugin-firebase/firebase';
import { isUndefined } from 'util';

import { log } from '../../logger/logger';
import { getSampleJSONSet } from '../../models/el-set';
import { getNewUserJSON } from '../../models/el-user';


export function createFilesForNewUser(user:User) {

	if (isUndefined(user)) {
		log(`Error: user is undefined inside createFilesForNewUser()`);
		return;
	}

	createUserFile(user);
	addSampleSetToUser(user);
}


function createUserFile(user: User) {

	if (isUndefined(user)) {
		log(`Error: user is undefined inside createUserFile()`);
		return;
	}

	const newUserJSON = getNewUserJSON(user);
	const users_collection = firebase.firestore.collection(`users`);

	users_collection.doc(`${user.uid}`).set(
		newUserJSON

	).then(() => {
		log(`New user has been added to users collection`);

	}).catch((err) => {
		log(`Error occured while adding new user to users collection: ${err}`);
	});
}


function addSampleSetToUser(user: User) {
	const user_sets = firebase.firestore.collection("users").doc(`${user.uid}`).collection(`sets`);

	user_sets.add({
		name: "sample"//just to get new document id
		
	}).then((doc) => {
		log(`New sample document has been created with id: ${JSON.stringify(doc.id)}`);

		const sampleJSONSet = getSampleJSONSet(doc.id);
		user_sets.doc(doc.id).set(
			sampleJSONSet

		).then(() => {
			log(`Proper sample set document has been created: ${JSON.stringify(doc)}`);

		}).catch((err) => {
			log(`Error occured while setting new set document to proper form ${err}`)
		});

	}).catch((err) => {
		log(`Error occured while creating of new set document: ${err}`);
	});
}

