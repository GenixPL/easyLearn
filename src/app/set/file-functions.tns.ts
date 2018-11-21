import { knownFolders, Folder, File } from "tns-core-modules/file-system";

import { Set } from './set';


const TAG: string = `file-functions.tns.ts`;


export function addNewJSONFile(fileName: string, fileContent: string) {

    if (fileName == ``) {
        console.error(`${TAG} you can not create file with empty name`);
        return;
	}

    const documents: Folder = <Folder>knownFolders.documents();
    const folder: Folder = <Folder>documents.getFolder("setsFolder");
    const file: File = <File>folder.getFile(fileName + `.json`);

        file.writeText(fileContent || "some random content")
        .then(() => {
            file.readText()
                .then((res) => {
                    console.log("successMessage", `Successfully saved in ${file.path}`);
                    console.log("writtenContent", res);
                });

        }).catch((err) => {
            console.log(err);
        });
}