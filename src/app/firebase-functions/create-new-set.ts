import { User, firestore } from 'nativescript-plugin-firebase';

import { ELSet, ELSetInterface } from '~/app/models/el-set';
import { log } from '~/app/logger/logger';


export function createNewSetForUser(set:ELSetInterface, user:User) {
	const user_sets = firestore.collection("users").doc(`${user.uid}`).collection(`sets`);

	user_sets.add({
		name: "sample"//just to get new document id
		
	}).then((doc) => {
		log(`New sample document has been created with id: ${JSON.stringify(doc.id)}`);
		set.document_id = doc.id;
		log(`\n${JSON.stringify(set)}\n`);

		user_sets.doc(doc.id).set(
			set	//TODO:add created_date to sets

		).then(() => {
			log(`Proper sample set document has been created: ${JSON.stringify(doc)}`);

		}).catch((err) => {
			log(`Error occured while setting new set document to proper form ${err}`)
		});

	}).catch((err) => {
		log(`Error occured while creating of new set document: ${err}`);
	});
}

export function getIdForNewSet() {
}