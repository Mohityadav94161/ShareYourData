// NotepadCard.js
import React, { useState, useEffect, forwardRef } from 'react';
import './feedbackform.css';
import cross from '../../assets/cross.svg'

export const FeedbackForm = forwardRef(({},ref) => {
    const [showModal, setShowModal] = useState(false);
    const [note, setNote] = useState('');
    const [openOnce, setOpenOnce] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);

    const handleSendFeedback = () => {
        // Save the note and tabName
        if (!note.trim()) {
            // If the textarea is empty or only contains whitespace
            setIsEmpty(true);
            return;
        }
    
        setIsEmpty(false);
        setOpenOnce(true);

        // Close the modal
        setShowModal(false);

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

    // useEffect(() => {

    //     if (name !== null) {
    //         setTabName(name);
    //     }
    //     if (detail !== null) {
    //         setNote(detail);
    //     }

    // }, [name, detail]);

    return (
        <div onClick={handleOpenOnce} ref={ref}>

            <div className="notepad-card" >

                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>
                                <img src={cross} alt='close' style={{ height: "14px" }} />
                            </span>
                            <h2>Feedback form</h2>
                          
                     
                            <textarea
                                
                                placeholder="Write your valuable feedback and suggestions here..."
                                value={note}
                                onChange={(e) => {
                                    setNote(e.target.value)
                                }}
                                className={isEmpty ? 'txt-error' : 'notepad-textarea'}
                            />
                            <button onClick={handleSendFeedback}>Send</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});