import { log } from '../../app/logger/logger';
import { ELWordsPair, ELWordsPairInterface } from './el-words-pair';

export interface ELSetInterface {
	set_name: string,
	document_id: string;
	language1: string,
	language2: string,
	words: ELWordsPairInterface[]
}


export class ELSet {
	private setname: string;
	private documentId: string
    private language1: string;
    private language2: string;
    private words: Array<ELWordsPair>;

    constructor(setName: string, documentId: string, language1: string, language2: string) {
		this.setname = setName;
		this.documentId = documentId;
        this.language1 = language1;
        this.language2 = language2;
        this.words = new Array(0);
	}

    changeSetName(newName: string) {
        this.setname = newName;
	}
	
	getSetName() {
		return this.setname;
	}

    changeFirstLanguage(newLanguage: string) {
        this.language1 = newLanguage;
    }

    changeSecondLanguage(newLanguage: string) {
        this.language2 = newLanguage;
    }

    addWords(word1: string, word2: string) {
		let words = new ELWordsPair(word1, word2);
		this.words.push(words);
    }

    changeWords(position: number, newWord1: string, newWord2: string) {
        this.words[position].word1 = newWord1;
        this.words[position].word2 = newWord2;
    }

    removeWords(position: number) {
        this.words.slice(position, 1);
	}

    getJSON() {
        let setJSON: ELSetInterface = {
			set_name: this.setname,
			document_id: this.documentId,
			language1: this.language1,
			language2: this.language2,
			words: this.getWordsJSONArray()
		};

        return setJSON;
    }

    getJSONString() {
        return JSON.stringify(this.getJSON());
	}
	
	private getWordsJSONArray() {
		let wordsData: string = `[`;
        for (let i = 0; i < this.words.length; i++) {

            wordsData += this.words[i].getJSONString();

            if (i != (this.words.length - 1)) {
                wordsData += `,`;
            }
		}
		wordsData += `]`;

		return <ELWordsPairInterface[]> JSON.parse(wordsData);
	}
}


export function getSetFromJSON(setJSON:ELSetInterface) {
	let newSet = new ELSet(setJSON.set_name, setJSON.document_id, setJSON.language1, setJSON.language2);
	setJSON.words.forEach((wordsPair:ELWordsPair) => {
		newSet.addWords(wordsPair.word1, wordsPair.word2);
	});

	return newSet;
}


export function getSampleJSONSet(documentId:string) {
	let sampleSet:ELSetInterface = {
		set_name: `sample-set`,
		document_id: documentId,
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