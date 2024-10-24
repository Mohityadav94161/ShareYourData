// NotepadCard.js
import React, { useState, useEffect, forwardRef } from 'react';
import './feedbackform.css';
import cross from '../../assets/cross.svg';
import { uploadFeedback } from '../../services/api';
import { toast } from 'react-toastify';

export const FeedbackForm = forwardRef(({},ref) => {
    const [showModal, setShowModal] = useState(false);
    const [note, setNote] = useState('');
    const [openOnce, setOpenOnce] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);

    const handleSendFeedback = async() => {
        // Save the note and tabName
        if (!note.trim()) {
            // If the textarea is empty or only contains whitespace
            setIsEmpty(true);
            return;
        }
        setIsEmpty(false);
        const id = toast.loading("Please wait...", { position: "top-center" })
        const res = await uploadFeedback(note);
        if(res.status ===200){
            toast.update(id, { render: "feedback sent successfully", type: "success", isLoading: false, autoClose: 3000, position: "top-center", closeOnClick: true, });

        }
        else{
            toast.update(id, { render: "error in sending feedback", type: "error", isLoading: false, autoClose: 3000, position: "top-center", closeOnClick: true, });

        }
        console.log('res of feedback ', res);
        setOpenOnce(true);
        // Close the modal
        setShowModal(false);
        return;
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