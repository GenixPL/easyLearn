import * as firebase from 'nativescript-plugin-firebase/app';
import { User } from 'nativescript-plugin-firebase/firebase';
import { isUndefined } from 'util';


export function createFilesForNewUser(user:User) {

	if (isUndefined(user)) {
		return;
	}

	createUser(user);

	const sets_collection = firebase.firestore().collection("sets");
	const privateSets_collection = sets_collection.doc("private-sets")

	privateSets_collection.collection(user.uid).doc("init-doc").set({
		id: user.uid
	}).then(() => {
		console.log("new collecion for user has been created");
	}).catch((err) => {
		console.log(`error during adding collection for new user: ${err}`);
	});

	const users_collection = firebase.firestore().collection("users");
	users_collection.doc(user.uid).set({
		id: user.uid,
		email: (user.email) ? user.email : " " //TODO: add other info and ability to make it private
	}).then(() => {
		console.log("new user has been added to users collection");
	}).catch((err) => {
		console.log(`error during adding user to users collection: ${err}`);
	});
}

function createUser(user: User) {

}

