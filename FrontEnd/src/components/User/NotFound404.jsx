// NotFound.js
import React, { useEffect, useState } from 'react';
import './notFound404.css';
import { Navbar } from '../footer and Headers/Navbar';
import {Link, useNavigate } from 'react-router-dom';

const NotFound404 = () => {
    const [timer, setTimer] = useState(7);
    const navigate = useNavigate();

    useEffect(() => {
        if ( timer > 0) {
            const timeInterval = setInterval(() => {
                setTimer((timer) => timer - 1);
            }, 1000);
            return () => clearInterval(timeInterval)

        }
        else if (timer === 0) {
            clearInterval();
            navigate('/');
        }
    }, [ timer, navigate])
    return (
        <>
            <Navbar />

            <div className='notpage'>
                <h2 className='notheading'>404 - Not Found</h2>
                <p className='notdetails'>The page you are looking for does not exist.</p>
                <p className='notdetails'>Redirecting to <Link to='/'><strong >Home Page </strong> </Link>in {timer}</p>
            </div>
        </>
    );
};

export default NotFound404;
