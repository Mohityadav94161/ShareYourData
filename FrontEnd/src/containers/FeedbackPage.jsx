import React, { useState, useEffect, useRef } from 'react';
import { getFeedback } from '../services/api';
import { ViewFeedbacks } from '../components/Feedback/ViewFeedback';
import { Navbar } from '../components/footer and Headers/Navbar';
import { toast } from 'react-toastify';

const FeedbackPage = () => {
    const [feedbackData, setFeedbackData] = useState([]);


    const feedbackPageRef = useRef();
    const handleDivClick = () => {
        feedbackPageRef.current.click();
    };

    useEffect(() => {
        const feedback = async () => {
            
            const res = await getFeedback();
            if (res.status === 200) {
                
                setFeedbackData(res.data);
                console.log(feedbackData);
            }
            else {
                toast.update( { render: "You are not authorized", type: "error", isLoading: false, autoClose: 3000, position: "top-center", closeOnClick: true, });
            }

            console.log('->', res);

        }
        feedback();
    }, [])





    return (
        <div>
            <Navbar />
            <div className='feedbackPage' style={{ minHeight: '95vh' }}>
                <h2>Feedback</h2>
                {(feedbackData && feedbackData.length > 0 ? (<div className='feedback-files-container' style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {(feedbackData.map((file) => (
                        <div  style={{ width: '180px', cursor: 'pointer', display: 'flex', flexDirection: 'column', padding: '2px', margin: '12px', border: '1.6px solid black', borderRadius: '4px', alignItems: 'center', justifyContent: 'end' }}>
                            
                            <div>{file.name}</div>
                            <div style={{borderBottom:'2px solid black'}}>Time: {new Date(file.uploadTime).toLocaleTimeString()} <br />
                                Date:{new Date(file.uploadTime).toLocaleDateString()}</div>
                            <p style={{fontFamily:'serif'}}>
                                {file.data}
                            </p>
                            {/* <ViewFeedbacks data={file} ref={feedbackPageRef} /> */}
                        </div>
                    )))}

                </div>) : <div>Noting here</div>)
                }
            </div>
        </div>

    )
}

export default FeedbackPage