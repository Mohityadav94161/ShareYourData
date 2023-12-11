// PhoneLogin.js
import React, { useEffect, useState } from 'react';
import './authPhoneNumber.css';
import { sendOtp, verifyOtp } from '../../services/api';

const AuthPhoneNumber = ({ title }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [timer, setTimer] = useState(160);

    const handleSendOtp = () => {

        const res = sendOtp(phoneNumber);
        console.log("click send otp res ", res)
        console.log('Sending OTP to:', phoneNumber);
        setTimer(160);
        // Update state to show OTP input and button
        setIsOtpSent(true);
    };
    const handleResendOtp = () => {
        // Add logic to resend OTP
        
        const res = sendOtp(phoneNumber)
        console.log("click Re-send otp res ", res)
        console.log('Resending OTP to:', phoneNumber);
        setTimer(160); // Reset timer
    };

    const handleLogin = () => {
        // Add logic to verify the OTP and perform login
        const res = verifyOtp(phoneNumber, otp);
        console.log("click verfy otp res ", res)
        console.log('Logging in with OTP:', otp);
    };

    useEffect(() => {
        if (isOtpSent && timer > 0) {
            const timeInterval = setInterval(() => {
                setTimer((prevtime) => prevtime - 1);
            }, 1000);
            return () => clearInterval(timeInterval)

        }
        else if (timer === 0) {
            clearInterval();
        }
    }, [isOtpSent, timer])

    return (
        <div className="phone-login-container">
            <div className="phone-login-form">
                <label htmlFor="phoneNumber">Phone Number:
                    {/* {isOtpSent && (
                        <span style={{ color: 'gray' }}> (Resend OTP in {timer} seconds)</span>
                    )} */}
                </label>
                <input
                    className='input-phone'
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                // disabled={isOtpSent}
                />

                {/* Show OTP input and button only if OTP is sent */}
                {isOtpSent && (
                    <>
                        <label className='label' htmlFor="otp" >Enter OTP:
                            {timer > 0 && (
                                <span style={{ fontSize: '14px', marginLeft: '0px' }}>
                                    ({Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60})
                                </span>)
                            }

                            {timer === 0 && (
                                <span onClick={handleResendOtp} style={{ fontSize: '12px', marginLeft: '0px', color: "#214ab3" }}>
                                    Resend OTP
                                </span>
                            )}

                        </label>
                        <input
                            className='input-phone'
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </>
                )}

                {/* Show "Send OTP" or "Login" button based on the current step */}
                {!isOtpSent ? (
                    <button className='authPhoneNumber-btn ' onClick={handleSendOtp}>Send OTP</button>
                ) : (
                    <button className='authPhoneNumber-btn ' onClick={handleLogin}>Verify</button>
                )}
            </div>
        </div>
    );
};


export default AuthPhoneNumber;
