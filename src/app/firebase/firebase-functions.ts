import * as firebase from 'nativescript-plugin-firebase/app';


export function addSetsCollectionForUser(uid:string) {
	const sets_collection = firebase.firestore().collection("sets");
	const privateSets_collection = sets_collection.doc("private-sets")

	privateSets_collection.collection(uid).add({
		id: uid
	}).then(() => {
		console.log("new collecion for user has been created");
	}).catch((err) => {
		console.log(`error during craetion of collection for new user: ${err}`);
	});
}