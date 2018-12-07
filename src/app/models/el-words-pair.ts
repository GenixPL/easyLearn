import { log } from "~/app/logger/logger";

export interface ELWordsPairInterface {
	word1: string,
	word2: string
}

export class ELWordsPair {
    word1: string;
    word2: string;

    constructor(word1: string, word2: string) {
        this.word1 = word1;
		this.word2 = word2;
    }

    getJSON() {
        let wordsPairJSON:ELWordsPairInterface = {
			word1: this.word1,
			word2: this.word2
		}

        return wordsPairJSON;
    }

    getJSONString() {
        return JSON.stringify(this.getJSON());
    }
}