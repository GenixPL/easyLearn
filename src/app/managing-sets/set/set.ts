
export class Set {
    private setname: string;
    private language1: string;
    private language2: string;
    private words: Array<WordsPair>;

    constructor(setName: string, language1: string, language2: string) {
        this.setname = setName;
        this.language1 = language1;
        this.language2 = language2;
        this.words = new Array(0);
    }

    changeSetName(newName: string) {
        this.setname = newName;
    }

    changeFirstLanguage(newLanguage: string) {
        this.language1 = newLanguage;
    }

    changeSecondLanguage(newLanguage: string) {
        this.language2 = newLanguage;
    }

    addWords(word1: string, word2: string) {
        this.words.push(new WordsPair(word1, word2));
    }

    changeWords(position: number, newWord1: string, newWord2: string) {
        this.words[position].word1 = newWord1;
        this.words[position].word2 = newWord2;
    }

    removeWords(position: number) {
        this.words.slice(position, 1);
    }

    getJSON() {

        let wordsData: string = `[`;
        for(let i = 0; i < this.words.length; i++) {

            wordsData += this.words[i].getJSONString();

            if (i != (this.words.length - 1)) {
                wordsData += `,`;
            }
        }
        wordsData += `]`;

        let setData: string = 
        `{
            "setname": "${this.setname}",
            "language1": "${this.language1}",
            "language2": "${this.language2}",
            "words": ${wordsData}
        }`;

        return JSON.parse(setData);
    }

    getJSONString() {

        let wordsData: string = `[`;
        for(let i = 0; i < this.words.length; i++) {

            wordsData += this.words[i].getJSONString();

            if (i != (this.words.length - 1)) {
                wordsData += `,`;
            }
        }
        wordsData += `]`;

        let setData: string = 
        `{
            "setname": "${this.setname}",
            "language1": "${this.language1}",
            "language2": "${this.language2}",
            "words": ${wordsData}
        }`;

        return setData;
    }
}

class WordsPair {
    word1: string;
    word2: string;

    constructor(word1: string, word2: string) {
        this.word1 = word1;
        this.word2 = word2;
    }

    getJSON() {
        let wordsData: string = 
        `{
            "word1": "${this.word1}",
            "word2": "${this.word2}"
        }`;

        return JSON.parse(wordsData);
    }

    getJSONString() {
        let wordsData: string = 
        `{
            "word1": "${this.word1}",
            "word2": "${this.word2}"
        }`;

        return wordsData;
    }
}
  