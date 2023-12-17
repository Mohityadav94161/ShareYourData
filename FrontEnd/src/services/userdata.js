import { getUserData, getFiles, getNotepad } from "./api";

var allData = [];
// [...new Set(dataArray)];
export const getUserProfileData = async () => {
    allData = [];
    var data = await getUserData();
    // console.log("userdata ", data);
    return data;
}

export const getFilesData = async () => {
    var files = await getFiles();
    allData = [];
    // console.log("files data ", files[0].expireDate);

    if (files !== 'Token is not valid') {
        for (var i = 0; i < files.length; i++) {
            let file = files[i];

            if (file.expireDate < Date.now()) {
                file.isLocked = true;
            }
            if (!allData.includes(file)) {
                allData.push(file);
            }

        }
        return files.reverse();
    }

}

export const getNotepadData = async () => {
    var files = await getNotepad();
    // console.log("notepad data ", files);
    if (files !== 'Token is not valid') {
        for (var i = 0; i < files.length; i++) {
            let file = files[i];

            if (file.expireDate < Date.now()) {
                file.isLocked = true;
            }
            if (!allData.includes(file)) {
                allData.push(file);
            }
        }
        return files.reverse();
    }

}

export const recentFilesData = async () => {
    // allData.sort((file1, file2) => {
    //     return file1.createdAt
    //         - file2.createdAt
    //         ;
    // })
    allData.sort((a, b) => (a.createdAt) - (b.createdAt));
    
    return allData;
}


