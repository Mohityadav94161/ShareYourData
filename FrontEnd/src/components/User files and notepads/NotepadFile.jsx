import { React, useState, useEffect } from 'react';
import { UserSavedNotepad } from './handle notepad/UserSavedNotepad'
import './file.css';
import lock from '../../assets/notepad-lock.svg';
import download from '../../assets/download.svg';

export const NotepadFile = ({ data }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [lockState, setLockState] = useState(false);

    const [expiryInfo, setExpiryInfo] = useState('');
    // console.log("received data ", data);
    
    // const [isLocked,setIsLocked] = useState(false);
    if(data !== undefined){
        // useEffect(() => {
        //     const calculateExpiry = () => {
        //         const expiryDate = new Date(data.expireDate);
        //         const currentDate = new Date();
        //         const timeDiff = expiryDate - currentDate;

        //         if (timeDiff <= 0) {
        //             setExpiryInfo(`Expired on ${expiryDate.toDateString().substring(0, 15)}`);
        //             setLockState(true);
        //         } else if (timeDiff < 86400000) {
        //             // Less than a day
        //             const hours = Math.floor(timeDiff / 3600000);
        //             const minutes = Math.floor((timeDiff % 3600000) / 60000);
        //             setExpiryInfo(`${hours}hr:${minutes}min`);
        //         } else if (timeDiff < 3600000) {
        //             // Less than an hour
        //             const minutes = Math.floor(timeDiff / 60000);
        //             const seconds = Math.floor((timeDiff % 60000) / 1000);
        //             setExpiryInfo(`${minutes}min:${seconds}`);
        //         } else {
        //             // More than an hour, display in days
        //             const days = Math.floor(timeDiff / 86400000);
        //             setExpiryInfo(` ${days} days`);
        //         }
        //     };
        //     calculateExpiry();
        // }, [data])
    }
    
    if (data === undefined) {
        return;
    }
    
    const formattedName = data.name.length > 40 ? `${data.name.substring(0, 40)}..` : data.name;

    const dateObject = new Date(data.createdAt);
    const formattedDate = `${dateObject.toDateString().substring(4, 15)}`;

    let formattedSize;
    if (data.data.bytes < 1024 * 1024) {
        // Display in KB if size is smaller than 1 MB
        formattedSize = (data.data.bytes / 1024).toFixed(2) + ' KB';
    } else {
        // Display in MB if size is 1 MB or larger
        formattedSize = (data.data.bytes / (1024 * 1024)).toFixed(4) + ' MB';
    }

    return (
        <div className='file-container'>

            {lockState
                ? (<div className='file-img-container' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <div className='expire-info'>{expiryInfo}</div>

                    <UserSavedNotepad className={`${(isHovered) ? 'file-img-hovered' : 'file-img'}`} name={formattedName} detail={data.data} />
                    <img className={`${(isHovered) ? 'file-lock-hovered' : 'file-lock'}`} src={lock} alt='file-lock' />
                </div>)
                : (<div className='file-img-container' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <div className='expire-info'>{expiryInfo}</div>
                    <UserSavedNotepad className={`${(isHovered) ? 'file-img-hovered' : 'file-img'}`} name={formattedName} detail={data.data} />
                    

                    {/* <img className='file-lock' src={lock} alt='file-lock' /> */}
                </div>)
            }

            <div className='file-details'>
                <p className='file-name file-text'>{formattedName}</p>
                <div className='file-size-data'>
                    {/* <p className='file-size '>{formattedSize} </p> */}
                    <p className='file-date '>{formattedDate}</p>
                </div>

                {/* <p className='file-owner file-text'>@wrongnumber001</p> */}
                <h4 className='file-by '>By:@wrongnumber01</h4>
            </div>
        </div>
    )
}