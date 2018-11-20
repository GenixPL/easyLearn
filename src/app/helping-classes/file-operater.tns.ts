import { knownFolders, Folder, File } from "tns-core-modules/file-system";

import { jsonSet } from '../create-new-set/create-new-set.component';

export function addNewSet(setName: string, content: JSON) {
    let folderName: string;
    let fileName: string;
    let fileTextContent: string;

    let successMessage: string;
    let writtenContent: string;
    let isItemVisible: boolean = false;

    console.log("dupa");

    
    const documents: Folder = <Folder>knownFolders.documents();
        console.log("dupa2" + documents);
    const folder: Folder = <Folder>documents.getFolder("setsFolder" || "testFolder");
        console.log("dupa3" + folder);
    const file: File = <File>folder.getFile((setName || "testFile") + `.txt`);
        console.log("dupa4" + file);

        file.writeText(JSON.stringify(content) || "some random content")
        .then(() => {
            file.readText()
                .then((res) => {
                    console.log("successMessage", `Successfully saved in${file.path}`);
                    console.log("writtenContent", res);
                    console.log("isItemVisible", true);
                });
        }).catch((err) => {
            console.log(err);
        });
}