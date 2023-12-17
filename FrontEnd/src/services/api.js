// api.js
const BASE_URL = 'http://localhost:3300'; // Replace with your actual API base URL

let authToken = ''; // Variable to store the JWT token

export let isSignIn = false;

// Function to set the JWT token after a successful login
export const setAuthToken = (token) => {
    authToken = token;

};
// const setIsSignIn = (value) => {
//     isSignIn = value;
// };

// export const isUserSignIn = ()=>{
//     return isSignIn;
// }


// Function to make a generic API request
const makeRequest = async (url, method = 'GET', data = null) => {
    const headers = {
        'Content-Type': 'application/json',
        token: `Bearer ${authToken}`, // Include JWT token in the headers
    };

    const config = {
        method,
        headers,
    };

    if (data) {
        config.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${BASE_URL}/${url}`, config);
        const responseData = await response.json();
        // console.log("respose data", responseData);
        const res = {"status": response.status, "data":responseData}
        // if (!response.ok) {
        //     console.log("error response",response)
        //     return responseData;
        //     // throw new Error(responseData.message || 'Something went wrong');
        // }
        if (responseData === 'Token is not valid'){
            isSignIn = false;
        }

        return res;

    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
    }
};

// Example API functions

export const sendOtp = async (phoneNumber) => {
    const data = { phoneNumber };
    const response = await makeRequest('user/sendOtp', 'POST', data);
    // setAuthToken(response.token); // Set JWT token after successful login
    return response;
};

export const verifyOtp = async (phoneNumber, otp) => {
    const data = { phoneNumber, otp };
    const response = await makeRequest('user/verifyOtp', 'POST', data);
    console.log("verifyOtp", response.data.token);
    if (response.status === 200) {
        setAuthToken(response.data.token);
        isSignIn = true;
        console.log('isSignIn', isSignIn);
        console.log("set the token", authToken);
    }
    // Set JWT token after successful login
    return response;
};


export const loginWithUsername = async (username, password) => {
    const data = { username, password };
    const response = await makeRequest('user/login', 'POST', data);
    if (response.status === 200) {
        setAuthToken(response.accessToken);
        isSignIn = true;
        
    }
    // Set JWT token after successful login
    console.log("response login with username: " + response);
    return response;
};

export const registerWithUsername = async (username, password) => {
    const data = { username, password };
    const response = await makeRequest('user/register', 'POST', data);

    console.log("register with username ", response);
    return response;
}

// export const shareData = async (file, notepadData ,username) => {

//     const data = { clipboardData: notepadData.data, clipboardName: notepadData.name, file ,username }

//     // if (file && notepadData.data.length() > 0) {
//     const UploadRes = await makeRequest('data/uploadDataUser', 'POST', data);

//     return  UploadRes ;
//     // }
//     // else if (file) {
//     //     const fileUploadRes = await makeRequest('uploadfile', 'POST', file);
//     //     return fileUploadRes;
//     // }
//     // else {
//     //     const notepadDataUploadRes = await makeRequest('uploadClipboard', 'POST', data);
//     //     return notepadDataUploadRes;
//     // }
// }

export const shareDataToNumber = async (file, notepadData, phonenumber) => {
    const formData = new FormData();
    formData.append("clipboardData", notepadData.data);
    formData.append("clipboardName", notepadData.name);
    formData.append("phonenumber", phonenumber);
    formData.append("file", file);

    // console.log(formData);
    // console.log(notepadData, phonenumber, file);
    const config = {
        method: 'POST',
        body: formData,

    };
    try {
        const response = await fetch(`${BASE_URL}/data/uploadDataPhone`, config);
        const responseData = await response.json();
        console.log('Response data:', responseData);

        return  { status: response.status, data: responseData };;
    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
    }
};

export const shareDataToUsername = async (file, notepadData, username) => {
    const formData = new FormData();
    formData.append("clipboardData", notepadData.data);
    formData.append("clipboardName", notepadData.name);
    formData.append("phonenumber", username);
    formData.append("file", file);

    // console.log(formData);
    // console.log(notepadData, username, file);
    const config = {
        method: 'POST',
        body: formData,
    };
    try {
        const response = await fetch(`${BASE_URL}/data/uploadDataUser`, config);
        const responseData = await response.json();
        console.log('Response data:', responseData);

        return {status:response.status,data:responseData};
    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
    }
};

export const getUserData = async () => {
    const response = await makeRequest('data/home', 'GET');
    return response.data;
}

export const getFiles = async () => {
    const response = await makeRequest('data/fileData', 'GET');
    return response.data;
}
export const getNotepad = async () => {
    const response = await makeRequest('data/clipboardData', 'GET');
    return response.data;
}

export const upload = async (file, notepadData) => {
    const formData = new FormData();
    formData.append("clipboardData", notepadData.data);
    formData.append("clipboardName", notepadData.name);
    formData.append("file", file);

    // console.log(formData);
    // console.log(notepadData, username, file);
    const config = {
        method: 'POST',
        body: formData,
    };
    try {
        const response = await fetch(`${BASE_URL}/data/uploadToUser`, config);
        const responseData = await response.json();
        console.log('Response data:', responseData);

        return response;
    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
    }
}


export const signOut = ()=>{
    isSignIn = false;
    authToken = '';
}

// Other API functions...
