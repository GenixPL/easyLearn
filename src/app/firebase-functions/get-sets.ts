import { User } from "nativescript-plugin-firebase";
import { firestore } from 'nativescript-plugin-firebase';
import { log } from "~/app/logger/logger";
import { ELSet, getSetFromJSON, ELSetInterface } from "~/app/models/el-set";

export async function getAllSetsForUser(user: User): Promise<ELSet[]> {
	let userSets;
	let setsArray: ELSet[] = new Array(0);

	try {
		userSets = await firestore.collection("users").doc(user.uid).collection("sets").get();
		log(`✔ get user sets`);

	} catch (err) {
		log(`✘ get user sets`);
		throw err;
	}

	userSets.forEach((setDoc) => {
		setsArray.push(getSetFromJSON(<ELSetInterface>setDoc.data()));
	});

	return setsArray;
}