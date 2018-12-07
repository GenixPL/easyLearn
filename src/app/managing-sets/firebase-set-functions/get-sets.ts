import { User } from "nativescript-plugin-firebase";
import { firestore } from 'nativescript-plugin-firebase';
import { log } from "~/app/logger/logger";
import { ELSet, getSetFromJSON, ELSetInterface } from "~/app/models/el-set";

export function getAllSetsForUser(user: User) {
	let fetchDataPromise = new Promise(function (resolve, reject) {
		const userSetsData = firestore.collection("users").doc(user.uid).collection("sets").get()
			.then((docs) => {
				let arrayOfSets:Array<ELSet> = new Array<ELSet>(0);

				docs.forEach((setDoc) => {
					arrayOfSets.push(getSetFromJSON(<ELSetInterface>setDoc.data()));
				});
				
				resolve(arrayOfSets);

			}).catch((err) => {
				log(`Error occured during fetching user sets documents: ${err}`);
				reject(`Data could not be fetched.`);
			});
	});

	return fetchDataPromise;
}