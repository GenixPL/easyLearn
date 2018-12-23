import { User } from 'nativescript-plugin-firebase';
import { ELFriendInterface } from './el-friend';
import { ELSetShortInfoInterface } from './el-set-short-info';


export interface ELUserInterface {
	uid: string,
	email: string,
	avatar_id: string,
	is_premium: boolean,
	joined_date: Date,
	nickname: string,
	ranking: number,	//TODO: ranking do jezyka
	is_visible_joined_date: boolean,
	is_visible_premium: boolean,
	is_visible_ranking: boolean,
	friends: ELFriendInterface[],
	sets: ELSetShortInfoInterface[]

	//TODO: add user default language
	//TODO: strukture quizu wymyslic
	//TODO: dodac czy chce powiadomienia
	//TODO: dodac kategorie do quizow
	//TODO: pomyslec czy jezyki moga sie miedzy sb quizowac
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
	private sets: ELSetShortInfoInterface[];


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
		this.sets = userJSON.sets;
	}

	public getUID(): string { return this.uid; }

	public getEmail(): string { return this.email; }

	public changeAvatarId(newAvatarId: string) { this.avatarId = newAvatarId; }
	public getAvatarId(): string { return this.avatarId; }

	public getIsPremium(): boolean { return this.isPremium; }
	public changeIsPremium(newPremiumStatus: boolean) { this.isPremium = newPremiumStatus; }

	public getJoinedDate(): Date { return this.joinedDate; }

	public getNickname(): string { return this.nickname; }
	public changeNickname(newNickname: string) { this.nickname = newNickname; }

	public getRanking(): number { return this.ranking; }
	public changeRanking(newRanking: number) { this.ranking = newRanking; }

	public getIsVisibleJoinedDate(): boolean { return this.isVisibleJoinedDate; }
	public changeIsVisibleJoinedDate(newStatus: boolean) { this.isVisibleJoinedDate = newStatus; }

	public getIsVisiblePremium(): boolean { return this.isVisiblePremium; }
	public changeIsVisiblePremium(newStatus: boolean) { this.isVisiblePremium = newStatus; }

	public getIsVisibleRanking(): boolean { return this.isVisibleRanking; }
	public changeIsVisibleRanking(newStatus: boolean) { this.isVisibleRanking = newStatus; }

	public getFriends(): ELFriendInterface[] { return this.friends; }
	public addFriend(newFriend: ELFriendInterface) { this.friends.push(newFriend); }
	public removeFriend(position: number) { this.friends.slice(position, 1); }

	public getSets(): ELSetShortInfoInterface[] { return this.sets; }
	public addSet(newSet: ELSetShortInfoInterface) { this.sets.push(newSet); }
	public removeSet(position: number) { this.sets.slice(position, 1); }

	public toJSON(): ELUserInterface {
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
			friends: this.friends,
			sets: this.sets
		}

		return user;
	}

	public static getNewUserJSON(user: User): ELUserInterface {
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
			friends: [],
			sets: []
		};

		return newUserJSON;
	}
}