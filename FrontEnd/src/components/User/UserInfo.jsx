import React, { useEffect, useState } from 'react';
import './user.css';
import userIcon from '../../assets/user.svg'
import { getUserData } from '../../services/api';
import { isSignIn } from '../../services/api';
import { Navbar } from '../footer and Headers/Navbar';
import { Link } from 'react-router-dom';

export const UserInfo = () => {
    const [userName, setUserName] = useState('');
    const [createdAt, setCreatedAt] = useState('Nov 23, 2023, 04:03:57 AM');
    const [lastUpdatedAt, setLastUpdatedAt] = useState('Nov 23, 2023, 04:03:57 AM');
    const [totalSize, setTotalSize] = useState(0);
    const [usedSize, setUsedSize] = useState(0);
    const [noOfFiles, setNoOfFiles] = useState(0);
    const [noOfNotes, setNoOfNotes] = useState(0);
    const [allowedNoOfNotes, setAllowedNoOfNotes] = useState(120);
    const [isAdmin, setIsAdmin] = useState(false);



    useEffect(() => {
        if (isSignIn) {
            const profile = async () => {
                const res = await getUserData();
                console.log('Got profile data:', res);
                setUserName(res.phoneNumber.length === 10 ? res.phoneNumber : res.username);
                setCreatedAt(new Date(res.createdAt).toLocaleDateString('en-US', options));
                setLastUpdatedAt(new Date(res.updatedAt).toLocaleDateString('en-US', options));
                setTotalSize(res.allowedSize);

                setUsedSize(res.size);
                
                setNoOfFiles(res.data.files != null ? res.data.files.length : 0);
                setNoOfNotes(res.data.clipboards != null ? res.data.clipboards.length : 0);
                setAllowedNoOfNotes(150);
                setIsAdmin(res.isAdmin);
                return res;
            }
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            profile();

        }


    }, [])

    return (
        <div>
            <Navbar />
            <div className="user-page">
                <div className="user-icon">
                    {/* Replace the URL with the path to your user icon */}
                    <img src={userIcon} alt="User Icon" />
                    <h2>{userName}</h2>
                    <p> <strong>Total Size: </strong>{(totalSize / 1024) / 1024} <strong>MB</strong> </p>
                    <p> <strong>Used Size: </strong>{((usedSize / 1024)/1024).toPrecision(4)}  <strong>MB</strong></p>
                    {isAdmin ?
                        (<div>
                            <Link to='/feedbacks'>
                                <h3>Feedbacks</h3>
                            </Link>
                        </div>) : <div></div>
                    }
                </div>
                <div className="user-details">
                    <p><strong>No. of Files: </strong>{noOfFiles} </p>
                    <p><strong>No. of Notes: </strong>{noOfNotes} </p>
                    <p><strong>Allowed no. of Notes: </strong>{allowedNoOfNotes} </p>
                    <p><strong>Created on: </strong> {createdAt}</p>
                    <p><strong>last Update: </strong>{lastUpdatedAt}</p>
                </div>

            </div>

        </div>
    )
}

