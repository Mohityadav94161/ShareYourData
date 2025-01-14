// NotepadCard.js
import React, { useState, forwardRef, useEffect } from 'react';
import './NotepadCard.css';
import cross from '../../assets/cross.svg'

const NotepadCard = forwardRef(({ onNoteSave }, ref) => {
    const [showModal, setShowModal] = useState(false);
    const [note, setNote] = useState('');
    const [tabName, setTabName] = useState('');
    const [openOnce, setOpenOnce] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);

    const handleSaveNote = () => {
        // Save the note and tabName
        if (!note.trim()) {
            // If the textarea is empty or only contains whitespace
            setIsEmpty(true);
            return;
        }
        console.log("1. onNoteSave card ", tabName, note);
        onNoteSave(tabName, note);


        setIsEmpty(false);
        setOpenOnce(true);

        // Close the modal
        setShowModal(false);

    };
    const handleNoteTabChange = (e) => {
        setNote(e.target.value);
    };
    const handleOpenOnce = () => {
        if (openOnce) {
            setShowModal(true);
            setOpenOnce(false);
        }
    }
    const closeModal = () => {
        setShowModal(false);
        setOpenOnce(true);

        console.log('closed', showModal);
    }

   

    return (
        <div onClick={handleOpenOnce} ref={ref}>

            <div className="notepad-card" >

                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>
                                <img src={cross} alt='close' style={{ height: "14px" }} />
                            </span>
                            <h2>Notepad</h2>
                            <input
                                className='notepad-input'
                                type="text"
                                placeholder="Title"
                                value={tabName}
                                onChange={(e) => {
                                    setTabName(e.target.value)
                                    onNoteSave(tabName, note);
                                }}
                            />
                            <textarea
                                placeholder="Write your note here..."
                                value={note}
                                onChange={(e) => {
                                    setNote(e.target.value)
                                    onNoteSave(tabName, note);
                                }}
                                className={isEmpty ? 'txt-error' : 'notepad-textarea'}
                            />
                            <button onClick={handleSaveNote}>Save</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

export default NotepadCard;
