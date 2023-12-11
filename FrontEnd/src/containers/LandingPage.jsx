// LandingPage.js
import React, { useState } from 'react';
import './LandingPage.css';

import Send from '../assets/send.svg';
import FileUpload from '../assets/upload.svg';
import { Notepad } from '../components/Upload file and notepad/Notepad';
// import NotepadCard from '../components/NotepadCard';
import { shareDataToNumber, shareDataToUsername } from '../services/api';

const LandingPage = () => {
    const [notepadData, setNotepadData] = useState({ name: '', data: '' });
    const [selectedFile, setSelectedFile] = useState(null);
    const [usernameInput, setUsernameInput] = useState('');


    // data received from Notepad
    const onNoteSave = (data) => {
        setNotepadData(data);
        console.log('Save',data)
        return data;
    }


    //upload file handling
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        setSelectedFile(file);


        console.log('Selected file:', selectedFile);
    };

    //send the data to the server
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


    return (
        <div>
            
            <div className="landing-page">
                <section className="landing-content">
                    <div className='instructions'>
                        <p><strong>1.</strong> Use <strong>Upload</strong> to upload the file from your system, currently .docx, images, videos, txt, programmable files (.py , .js ..etc) are supported </p>
                        <p><strong>2.</strong> Use <strong>Notepad</strong> to note down some thing or use it as copy and paste</p>
                        <p><strong>3.</strong> You can send file to any <strong>mobile number</strong> and then <strong>login</strong> using the same number and otp no require to <strong>register first</strong>   </p>
                        <p><strong>4.</strong> You can only send to those <strong>usernames which are already exists,</strong> means you need to register first</p>
                    </div>
                    <div className='cards-section'>
                        <div className='card left-card'>
                            <Notepad Entereddata={onNoteSave} />
                        </div>
                        <label className="card right-card" >
                            <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
                            {!selectedFile &&
                                <div>
                                    <img className='upload-file' src={FileUpload} alt="Upload file" />
                                    <p style={{ fontSize: "16px", margin: "0px" }}>Upload</p>
                                </div>
                            }
                            {
                                selectedFile &&
                                <div style={{ fontSize: "14px", textAlign: "center",width:"80px" }}>
                                        <p style={{ overflowWrap: "break-word" }} ><strong>File: </strong> {(selectedFile && selectedFile.name.length > 24) ? `${selectedFile.name.substring(0, 24)}...` : selectedFile.name}
                                    </p>
                                    <p style={{ background: "#ccc",borderRadius:"4px" }}><strong> {(selectedFile.size / 1000)}KB </strong></p>
                                </div>
                            }
                        </label>
                    </div>

                    <label className="input-box">
                        <input className='send-input' type="text" placeholder="Enter number or username" onChange={(e) => { setUsernameInput(e.target.value) }} />
                        <img onClick={send} src={Send} alt="Arrow Icon" style={{ height: "26px", width: "26px",alignItems:"center" }} />
                    </label>
                </section>

            </div>
        </div>
    );
};

export default LandingPage;
