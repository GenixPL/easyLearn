import { User } from 'nativescript-plugin-firebase';
import { ELFriendInterface } from './el-friend';


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


export class ELUser {
	private uid: string;
	private email: string;
	private avatarId: string;
	private isPremium: boolean;
	private joinedDate: Date;
	private nickname: string;
	private ranking: number;
	private isVisibleJoinedDate: boolean;
	private isVisiblePremium: boolean;
	private isVisibleRanking: boolean;
	private friends: ELFriendInterface[];


	constructor(userJSON: ELUserInterface) {
		this.uid = userJSON.uid;
		this.email = userJSON.email;
		this.avatarId = userJSON.avatar_id;
		this.isPremium = userJSON.is_premium;
		this.joinedDate = userJSON.joined_date;
		this.nickname = userJSON.nickname;
		this.ranking = userJSON.ranking;
		this.isVisibleJoinedDate = userJSON.is_visible_joined_date;
		this.isVisiblePremium = userJSON.is_visible_premium;
		this.isVisibleRanking = userJSON.is_visible_ranking;
		this.friends = userJSON.friends;
	}

	getUID(): string { return this.uid; }

	getEmail(): string { return this.email; }

	changeAvatarId(newAvatarId: string) { this.avatarId = newAvatarId; }
	getAvatarId(): string { return this.avatarId; }

	getIsPremium(): boolean { return this.isPremium; }
	changeIsPremium(newPremiumStatus: boolean) { this.isPremium = newPremiumStatus; }

	getJoinedDate(): Date { return this.joinedDate; }

	getNickname(): string { return this.nickname; }
	changeNickname(newNickname: string) { this.nickname = newNickname; }

	getRanking(): number { return this.ranking; }
	changeRanking(newRanking: number) { this.ranking = newRanking; }

	getIsVisibleJoinedDate(): boolean { return this.isVisibleJoinedDate; }
	changeIsVisibleJoinedDate(newStatus: boolean) { this.isVisibleJoinedDate = newStatus; }

	getIsVisiblePremium(): boolean { return this.isVisiblePremium; }
	changeIsVisiblePremium(newStatus: boolean) { this.isVisiblePremium = newStatus; }

	getIsVisibleRanking(): boolean { return this.isVisibleRanking; }
	changeIsVisibleRanking(newStatus: boolean) { this.isVisibleRanking = newStatus; }

	addFirend(newFriend: ELFriendInterface) {
		this.friends.push(newFriend);
	}

	removeFriend(position: number) {
		this.friends.slice(position, 1);
	}

	getUserJSON(): ELUserInterface {
		let user: ELUserInterface = {
			uid: this.uid,
			email: this.email,
			avatar_id: this.avatarId,
			is_premium: this.isPremium,
			joined_date: this.joinedDate,
			nickname: this.nickname,
			ranking: this.ranking,
			is_visible_joined_date: this.isVisibleJoinedDate,
			is_visible_premium: this.isVisiblePremium,
			is_visible_ranking: this.isVisibleRanking,
			friends: this.friends
		}

		return user;
	}
}


export function getNewUserJSON(user: User) {
	let newUserJSON: ELUserInterface = {
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