import { knownFolders, Folder, File, FileSystemEntity } from 'tns-core-modules/file-system';


export const setsFolderName: string = `setsFolder`;
const TAG: string = `file-functions.tns.ts`;


export function addNewJSONFile(fileName: string, fileContent: string) {
	if (fileName == ``) {
        console.error(`${TAG} you can not create file with empty name`);
        return;
	}

    const documents: Folder = <Folder>knownFolders.documents();
    const folder: Folder = <Folder>documents.getFolder(setsFolderName);
    const file: File = <File>folder.getFile(fileName + `.json`);

	file.writeTextSync(fileContent, (err) => {
        console.log(err);
    });
}

export function getSetsFiles() {
	let array: any;
	let arrayOfSets: Array<string> = new Array(0);

	const documents: Folder = <Folder>knownFolders.documents();
	const folder: Folder = <Folder>documents.getFolder(setsFolderName);

	array = folder.getEntitiesSync();
	array.forEach(element => {
		arrayOfSets.push(<string>element.name);
	});

	return arrayOfSets;
}

export function deleteSet(setName: string) {
	const fileName: string = `${setName}.json`;

	const documents: Folder = <Folder>knownFolders.documents();
	const folder: Folder = <Folder>documents.getFolder(setsFolderName);
	const file: File = <File>folder.getFile(fileName);

	file.removeSync((err) => { console.log(`Error during file removal: ${err}`); });
	console.log("set deleted"); //TODO: we may output this even after error
								//TODO: we should change all sync methods into async
}