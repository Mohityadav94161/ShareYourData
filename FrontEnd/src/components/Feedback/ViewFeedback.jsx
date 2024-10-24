// NotepadCard.js
import React, { useState, forwardRef } from 'react';
import './feedbackform.css';
import cross from '../../assets/cross.svg';


export const ViewFeedbacks = forwardRef(({ data }, ref) => {
    const [showModal, setShowModal] = useState(false);

    const [openOnce, setOpenOnce] = useState(true);
    const handleOpenOnce = () => {
        if (openOnce) {
            setShowModal(true);
            setOpenOnce(false);
        }
    }
    const closeModal = () => {
        setShowModal(false);
        setOpenOnce(true);
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
                            <h2>Feedback</h2>
                            <div style={{ padding: '12px', width: '97%', border: '2px solid black', borderRadius: '4px', display: 'flex' }}>
                                <div style={{ padding: '6px', margin: '12px', border: '2px solid black', borderRadius: '4px' }}>
                                    BY : {data.name}
                                </div>
                                <div style={{ padding: '6px', margin: '12px', border: '2px solid black', borderRadius: '4px' }}>
                                    Time: {new Date(data.uploadTime).toLocaleTimeString()} <br/>
                                    Date:{new Date(data.uploadTime).toLocaleDateString()}
                                </div>
                            </div>
                            <p className='notepad-textarea' style={{ width: '100%' }}>
                                {data.data}
                            </p>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});