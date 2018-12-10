import * as firebase from 'nativescript-plugin-firebase';
import { User } from 'nativescript-plugin-firebase/firebase';
import { isUndefined } from 'util';

import { log } from '~/app/logger/logger';
import { getSampleJSONSet } from '~/app/models/el-set';
import { getNewUserJSON } from '~/app/models/el-user';
import { createNewSetForUser } from './create-new-set';


export async function createFilesForNewUser(user: User) {

	if (isUndefined(user)) {
		log(`✘ create files for new user (user is undefined)`);
		return;
	}

	try {
		await createUserFile(user);
		await addSampleSetToUser(user);

		log(`✔ create files for new user`);

	} catch (err) {
		log(`✘ create files for new user`);
	}
}


async function createUserFile(user: User) {
	const newUserJSON = getNewUserJSON(user);
	const users_collection = firebase.firestore.collection(`users`);

	try {
		await users_collection.doc(`${user.uid}`).set(
			newUserJSON
		)
		log(`✔ add new user to files`);

	} catch (err) {
		log(`✘ add new user to files`);
		throw err;
	}
}


async function addSampleSetToUser(user: User) { //TODO:merge this function with the one from create-new-set.ts
	const user_sets = firebase.firestore.collection("users").doc(`${user.uid}`).collection(`sets`);

	try {
		await createNewSetForUser(getSampleJSONSet(), user);
		log(`✔ add sample set`);

	} catch (err) {
		log(`✘ add sample set`);
		throw err;
	}
}

