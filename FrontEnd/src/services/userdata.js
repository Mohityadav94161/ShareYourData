import { getUserData, getFiles, getNotepad, authenticationToken } from "./api";


var allData = [];

export const getUserProfileData = async () => {
    const { token } = authenticationToken
    allData = [];
    var data = await getUserData(token);

    return data;
}

export const getFilesData = async () => {
    const { token } = authenticationToken
    var files = await getFiles(token);
    allData = [];

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
    const { token } = authenticationToken
    var files = await getNotepad(token);

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
