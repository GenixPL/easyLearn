import { ELWordsPair, ELWordsPairInterface } from './el-words-pair';


export interface ELSetInterface {
	set_name: string,
	document_id: string,
	created_date: Date,
	language1: string,
	language2: string,
	words: ELWordsPairInterface[]
}


export class ELSet {
	private setName: string; //TODO: zmienic na public i set setName
	private documentId: string;
	private createdDate: Date;
	private language1: string;
	private language2: string;
	private words: ELWordsPair[];

	constructor(setName: string, documentId: string, createdDate: Date, language1: string, language2: string) {
		this.setName = setName;
		this.documentId = documentId;
		this.createdDate = createdDate;
		this.language1 = language1;
		this.language2 = language2;
		this.words = new Array<ELWordsPair>(0);
	}

	public changeSetName(newName: string) { this.setName = newName; }
	public getSetName(): string { return this.setName; }

	public getDocumentId(): string { return this.documentId; }

	public getCreatedDate(): Date { return this.createdDate; }

	public changeFirstLanguage(newLanguage: string) { this.language1 = newLanguage; }
	public getFirstLanguage(): string { return this.language1; }

	public changeSecondLanguage(newLanguage: string) { this.language2 = newLanguage; }
	public getSecondLanguage(): string { return this.language2; }

	public getWords(): Array<ELWordsPair> { return this.words; }

	public addWords(word1: string, word2: string) {
		let words = new ELWordsPair(word1, word2);
		this.words.push(words);
	}

	public changeWords(position: number, newWord1: string, newWord2: string) {
		this.words[position].word1 = newWord1;
		this.words[position].word2 = newWord2;
	}

	public removeWords(position: number) {
		this.words.slice(position, 1);
	}

	public toJSON(): ELSetInterface {
		let setJSON: ELSetInterface = {
			set_name: this.setName,
			document_id: this.documentId,
			created_date: this.createdDate,
			language1: this.language1,
			language2: this.language2,
			words: this.words
		};

		return setJSON;
	}

	public static getSampleSetJSON(): ELSetInterface {
		let sampleSet: ELSetInterface = {
			set_name: `sample-set`,
			document_id: "wrong id, must be changed",
			created_date: new Date(),
			language1: `EN`,
			language2: `DE`,
			words: [{
				word1: `sun`,
				word2: `Sonne`
			}, {
				word1: `car`,
				word2: `Auto`
			}]
		}

		return sampleSet;
	}

	public static getSetFromJSON(setJSON: ELSetInterface): ELSet {
		let newSet = new ELSet(setJSON.set_name, setJSON.document_id, setJSON.created_date, setJSON.language1, setJSON.language2);
		setJSON.words.forEach((wordsPair: ELWordsPair) => {
			newSet.addWords(wordsPair.word1, wordsPair.word2);
		});

		return newSet;
	}
}