import { React, useEffect, useState } from 'react';
import fileIcon from '../../assets/File.svg';
import './file.css';
import lock from '../../assets/file-lock.svg';
import download from '../../assets/download.svg';

export const File = ({ data }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [lockState, setLockState] = useState(data.isLocked);

    const [expiryInfo, setExpiryInfo] = useState('');
    // const [isLocked,setIsLocked] = useState(false);
    useEffect(() => {
        const calculateExpiry = () => {
            const expiryDate = new Date(data.expireDate);
            const currentDate = new Date();
            const timeDiff = expiryDate - currentDate;

            if (timeDiff <= 0) {
                setExpiryInfo(`Expired on ${expiryDate.toDateString().substring(0,15)}`);
                setLockState(true);
            } else if (timeDiff < 86400000) {
                // Less than a day
                const hours = Math.floor(timeDiff / 3600000);
                const minutes = Math.floor((timeDiff % 3600000) / 60000);
                setExpiryInfo(`${hours}hr:${minutes}min`);
            } else if (timeDiff < 3600000) {
                // Less than an hour
                const minutes = Math.floor(timeDiff / 60000);
                const seconds = Math.floor((timeDiff % 60000) / 1000);
                setExpiryInfo(`${minutes}min:${seconds}`);
            } else {
                // More than an hour, display in days
                const days = Math.floor(timeDiff / 86400000);
                setExpiryInfo(` ${days} days`);
            }
        };
        calculateExpiry();
    }, [data])
    const formattedName = data.data.original_filename.length > 20 ? `${data.data.original_filename.substring(0, 20)}..` : data.data.original_filename;

    const dateObject = new Date(data.createdAt);
    const formattedDate = `${dateObject.toDateString().substring(4, 15) }`;

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
                    <img className={`${(isHovered) ? 'file-img-hovered' : 'file-img'}`} src={fileIcon} alt='file-img' />
                    <img className={`${(isHovered) ? 'file-lock-hovered' : 'file-lock'}`} src={lock} alt='file-lock' />
                </div>)
                : (<div className='file-img-container' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <div className='expire-info'>{expiryInfo}</div>
                    <img className={`${(isHovered) ? 'file-img-hovered' : 'file-img'}`} src={fileIcon} alt='file-img' />
                    <img className={`${(isHovered) ? 'download-img-hovered' : 'download-img'}`} src={download} alt='download' />

                    {/* <img className='file-lock' src={lock} alt='file-lock' /> */}
                </div>)
            }

            <div className='file-details'>
                <p className='file-name file-text'>{formattedName}</p>
                <div className='file-size-data'>
                    <p className='file-size '>{formattedSize} </p>
                    <p className='file-date '>{formattedDate}</p>
                </div>

                {/* <p className='file-owner file-text'>@wrongnumber001</p> */}
                <h4 className='file-by '>By:@wrongnumber01</h4>
            </div>
        </div>
    )
}
