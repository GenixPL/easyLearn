import { User, firestore } from 'nativescript-plugin-firebase';

import { ELSet, ELSetInterface } from '~/app/models/el-set';
import { log } from '~/app/logger/logger';


export async function createNewSetForUser(set: ELSetInterface, user: User) {
	const user_sets = firestore.collection("users").doc(`${user.uid}`).collection(`sets`);

	try {
		set.document_id = await getIdForNewSetForUser(user);

		await user_sets.doc(set.document_id).set(
			set
		)
		log(`✔ create new set`);

	} catch (err) {
		log(`✘ create new set`);
	}
}

export async function getIdForNewSetForUser(user: User): Promise<string> {
	const user_sets = firestore.collection("users").doc(`${user.uid}`).collection(`sets`);
	let doc;

	try {
		doc = await user_sets.add({
			name: "sample"
		});
		log(`✔ get new set id`);

	} catch (err) {
		log(`✘ get new set id`);
	}

	return doc.id;
}