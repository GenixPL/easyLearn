import { User } from "nativescript-plugin-firebase";

export interface ELUserInterface {
	uid: string,
	email: string,
	avatar_id: string,
	is_premium: boolean,
	joined_date: Date,
	nickname: string,
	ranking: number,
	is_visible_joined_date: boolean,
	is_visible_premium: boolean,
	is_visible_ranking: boolean,
	friends: ELFriendInterface[]
}

export interface ELFriendInterface {
	avatar_id: string,
	nickname: string,
	ranking: number,
	uid: string
}

export function getNewUserJSON(user: User) {
	let newUserJSON:ELUserInterface = {
		uid: user.uid,
		email: user.email || "",
		avatar_id: "",
		is_premium: false,
		joined_date: new Date(),
		nickname: "",
		ranking: 1000,
		is_visible_joined_date: true,
		is_visible_premium: true,
		is_visible_ranking: true,
		friends: []
	}

	return newUserJSON;
}