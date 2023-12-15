// LandingPage.js
import React, { useEffect, useState } from 'react';
import './LandingPage.css';

import Send from '../assets/send.svg';
import FileUpload from '../assets/upload.svg';
import { Notepad } from '../components/Upload file and notepad/Notepad';
// import NotepadCard from '../components/NotepadCard';
import { shareDataToNumber, shareDataToUsername } from '../services/api';
import { toast } from 'react-toastify';

const LandingPage = () => {
    const [notepadData, setNotepadData] = useState({ name: '', data: '' });
    const [selectedFile, setSelectedFile] = useState(null);
    const [usernameInput, setUsernameInput] = useState('');
    const [isPressed, setIsPressed] = useState(false);


    // data received from Notepad
    const onNoteSave = (data) => {
        setNotepadData(data);
        console.log('Save', data)
        return data;
    }


    //upload file handling
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log('file is select  ');
        setSelectedFile(file);
        console.log('Selected file is :', selectedFile);
    };

    //send the data to the server
    const send = async () => {
        if (usernameInput.trim().length === 0) {
            toast.warn("Please enter PhoneNumber or the username", {
                position: "top-center",
                autoClose: 600000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        setTimeout(async () => {
            console.log('Selected file: is', selectedFile);
            if (isValidPhoneNumber(usernameInput) && notEmpty()) {
                console.log('sending data to phonenumber ');
                const id = toast.loading("Please wait...", { position: "top-center" })

                const res = await shareDataToNumber(selectedFile, notepadData, usernameInput);

                console.log('Sent file:', res);
                if (res.status === 200) {
                    toast.update(id, { render: res.data, type: "success", isLoading: false, autoClose: 30000, position: "top-center", closeOnClick: true, });
                    setSelectedFile(null);
                    setNotepadData({ name: '', data: '' });
                }
                else {
                    toast.update(id, { render: res.data, type: "error", isLoading: false, autoClose: 60000, position: "top-center", closeOnClick: true, });
                }


            }
            else if (notEmpty()) {
                console.log('sending data to username ');
                const id = toast.loading("Please wait...", { position: "top-center" })

                const res = await shareDataToUsername(selectedFile, notepadData, usernameInput);
                console.log('Sent file:', res);

                if (res.status === 200) {
                    toast.update(id, { render: res.data, type: "success", isLoading: false, autoClose: 30000, position: "top-center", closeOnClick: true, });
                    setSelectedFile(null);
                    setNotepadData({ name: '', data: '' });
                }
                else {
                    toast.update(id, { render: res.data, type: "error", isLoading: false, autoClose: 60000, position: "top-center", closeOnClick: true, });
                }
                setNotepadData({ name: '', data: '' });
            }
            else {
                toast.warn("Nothing selected and notepad is empty", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                console.log('sending data to empty')
            }
        }, 1000)

        setIsPressed(true);
        // Simulate a delay and reset the pressed state after a short duration
        setTimeout(() => {
            setIsPressed(false);
        }, 200);
    }
    const notEmpty = () => {
        if (selectedFile === null && notepadData.name === '' && notepadData.data === '') {
            return false;
        }
        return true;
    }
    function isValidPhoneNumber(input) {
        // Check if the numeric input is exactly 10 digits
        return /^[0-9]{10}$/.test(input);
    }

    useEffect(() => {
        console.log('selected file ', selectedFile);
        console.log('data ', notepadData);
    }, [selectedFile, notepadData])

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
                                <div style={{ fontSize: "14px", textAlign: "center", width: "80px" }}>
                                    <p style={{ overflowWrap: "break-word" }} ><strong>File: </strong> {(selectedFile && selectedFile.name.length > 24) ? `${selectedFile.name.substring(0, 24)}...` : selectedFile.name}
                                    </p>
                                    <p style={{ background: "#ccc", borderRadius: "4px" }}><strong> {(selectedFile.size / 1000)}KB </strong></p>
                                </div>
                            }
                        </label>
                    </div>

                    <label className="input-box">
                        <input className='send-input' type="text" placeholder="Enter number or username" onChange={(e) => { setUsernameInput(e.target.value) }} />
                        <img className={isPressed ? 'landingpg-send-arrow-img-pressed' : 'landingpg-send-arrow-img'} onClick={send} src={Send} alt="Arrow Icon" style={{ height: "26px", width: "26px" }} />
                    </label>
                </section>

            </div>
        </div>
    );
};

export default LandingPage;
