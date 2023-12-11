import { React, useState, useRef } from 'react';
import NotepadIcon from '../../../assets/notepadUser.svg';
import NotepadCard from './UserSavedNotepadCard';
import './UserSavednotepad.css';

export const UserSavedNotepad = ({ name, detail }) => {
    const notepadRef = useRef();
    const handleDivClick = () => {
        notepadRef.current.click();
    };
    return (
        <div>
            <div className="notepad-card" onClick={handleDivClick} >
                <img className='UserSavednotepadIcon' src={NotepadIcon} alt="Notepad" />
                <p style={{ fontSize: "16px", margin: "0px" }}>Notepad</p>
            </div>
            <NotepadCard name={name} detail={detail} ref={notepadRef} />
        </div>
    )
}
