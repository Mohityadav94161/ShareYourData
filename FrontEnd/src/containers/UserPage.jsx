import { React, useEffect, useState } from 'react';
import './userPage.css'; // Don't forget to create a CSS file for styling
import { Notepad } from '../components/Upload file and notepad/Notepad';
import FileUpload from '../assets/upload.svg';
import Send from '../assets/send.svg';
import { File } from '../components/User files and notepads/File';
import { NotepadFile } from '../components/User files and notepads/NotepadFile';
import { shareDataToNumber, shareDataToUsername } from '../services/api';
import { getUserProfileData, getFilesData, getNotepadData, recentFilesData } from '../services/userdata';


const UserPage = () => {
    const [notepadData, setNotepadData] = useState({ name: '', data: '' });
    const [selectedFile, setSelectedFile] = useState(null);
    const [usernameInput, setUsernameInput] = useState('');
    const [fileData, setFileData] = useState([]);
    const [notepadDB, setNotepadDB] = useState([]);
    const [recentFile, setRecentFile] = useState([]);
    // data received from Notepad
    const onNoteSave = (data) => {
        setNotepadData(data);
        console.log("notepad data", data);
        // return data;
    }
    const send = () => {

        if (isValidPhoneNumber(usernameInput)) {
            console.log('sending data to phonenumber ', notepadData);
            const res = shareDataToNumber(selectedFile, notepadData, usernameInput);
            console.log('Sent file:', res);
        }
        else {
            console.log('sending data to username ');
            const res = shareDataToUsername(selectedFile, notepadData, usernameInput);
            console.log('Sent file:', res);
        }


    }
    function isValidPhoneNumber(input) {
        // Check if the numeric input is exactly 10 digits
        return /^[0-9]{10}$/.test(input);
    }
    const profile = async () => {
        const res = await getUserProfileData();
        console.log('Got profile data:', res);
        return res;
    }



    //upload file handling
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        setSelectedFile(file);
        console.log('Selected file:', selectedFile);
    };

    useEffect(() => {
        const userFile = async () => {
            const res = await getFilesData();
            console.log('get file data:', res);
            if (res !== 'Token is not valid') {
                setFileData(res);
                console.log('Set file data:', fileData);
            }
        }
        const userNotes = async () => {
            const res = await getNotepadData();
            console.log('get notepad data:', res);
            if (res !== 'Token is not valid') {
                setNotepadDB(res);
                console.log('set notepad data:', notepadDB);
            }
            return res;
        }
        const recentFiles = async () => {
            const res = await (recentFilesData());
            console.log('recent files:', res)
            if (res !== 'Token is not valid') {
                setRecentFile(res);
                console.log('set recent data:', recentFile);
            }
            return res;
        }
        userFile();
        userNotes();
        recentFiles();
    }, [])

    return (
        <div className="container">
            <div className="left-column">
                {/* Left Column Content Goes Here */}
                <div className='left-col-row-items'>
                    <div className="notepad-file-item">
                        <Notepad Entereddata={onNoteSave} />
                    </div>
                    <div >
                        <label className="upload-file-item " >
                            <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
                            {!selectedFile &&
                                <div>
                                    <img className='upload-file' src={FileUpload} alt="Upload file" />
                                    <p style={{ fontSize: "16px", margin: "1px" }}>Upload</p>
                                </div>
                            }
                            {
                                selectedFile &&
                                <div className='userPage-inserted-file-data'>
                                    <p style={{ overflowWrap: "break-word" }}><strong>File: </strong> {(selectedFile && selectedFile.name.length > 24) ? `${selectedFile.name.substring(0, 24)}...` : selectedFile.name}
                                    </p>
                                    <p style={{ background: "#ccc", borderRadius: "4px" }}><strong> {(selectedFile.size / 1000).toPrecision(4)}KB </strong></p>
                                </div>
                            }
                        </label>
                    </div>
                </div>
                <button className='userpage-uploadBtn'>
                    Upload
                </button>
                <h4 style={{ margin: "6px" }}>OR</h4>
                <div className="userpage-input-box">
                    <input className='userpage-send-input' type="text" placeholder="Enter number or username" onChange={(e) => { setUsernameInput(e.target.value) }} />
                    <img onClick={send} src={Send} alt="Arrow Icon" style={{ height: "22px", width: "22px" }} />
                </div>
            </div>
            <div className="main-content">
                {/* Main Content Goes Here */}
                <div className="section-header">Recent</div>
                <p className='all-files' style={{ textAlign: "end", color: "blue", cursor: "pointer" }}>more..</p>
                <div className="section">
                    {recentFile && recentFile.length > 0 ?
                        (<div className='files-container'>

                            {(recentFile.slice(0, 7).map((file) => (
                                (file.name !== undefined)
                                    ? (<NotepadFile key={file._id} data={file} />)
                                    : (<File key={file._id} data={file} />)
                            )))}

                        </div>) :
                        <div>
                            Nothing Here
                        </div>
                    }
                </div>
                <div className="section-header">Notepad</div>
                <p className='all-files' style={{ textAlign: "end", color: "blue", cursor: "pointer" }}>more..</p>
                <div className="section">
                    {(notepadDB && notepadDB.length > 0 ? (<div className='files-container'>

                        {(notepadDB.map((file) => (
                            // console.log("sending file " , file)
                            <NotepadFile key={file._id} data={file} />
                        )))}

                    </div>) : <div>Noting here</div>)

                    }
                </div>
                <div className="section-header">Files</div>
                <p className='all-files' style={{ textAlign: "end", color: "blue", cursor: "pointer" }}>more..</p>
                <div className="section">
                    {(fileData && fileData.length > 0 ? (<div className='files-container'>

                        {(fileData.map((file) => (
                            <File key={file._id} data={file} />
                        )))}

                    </div>) : <div>Noting here</div>)

                    }
                </div>

            </div>
        </div>
    );
};

export default UserPage;
