// PhoneLogin.js
import React, { useEffect, useState } from 'react';
import './authPhoneNumber.css';
import { sendOtp, verifyOtp } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthPhoneNumber = ({ title }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [timer, setTimer] = useState(160);
    const navigate = useNavigate();

    function isValidPhoneNumber(input) {
        // Check if the numeric input is exactly 10 digits
        return /^[0-9]{10}$/.test(input);
    }

    const handleSendOtp = async () => {
        if (isValidPhoneNumber(phoneNumber)) {
            const id = toast.loading("Please wait...", { position: "top-center" })
            //do something else

            const res = await sendOtp(phoneNumber);


            if (res.status === 200) {
                toast.update(id, { render: "OTP Sent", type: "success", isLoading: false, autoClose: 3000, position: "top-center", closeOnClick: true, });
            }
            else {
                toast.update(id, { render: "Error in OTP Sent", type: "error", isLoading: false, autoClose: 5000, position: "top-center", closeOnClick: true, });
            }
            console.log("click send otp res ", res)
            console.log('Sending OTP to:', phoneNumber);
            setTimer(160);

            // Update state to show OTP input and button
            setIsOtpSent(true);
        }
        else {
            console.log("invalid number")
            toast.error("Invalid number", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }


    };
    const handleResendOtp = async () => {
        // Add logic to resend OTP
        const id = toast.loading("Please wait...")
        //do something else

        const res = await sendOtp(phoneNumber);
        if(res.status === 200){
            toast.update(id, { render: "OTP Re-sent", type: "success", isLoading: false, autoClose: 3000, position: "top-center", closeOnClick: true, });
        }
        else{
            toast.update(id, { render: "Error in OTP Re-sent", type: "error", isLoading: false, autoClose: 5000, position: "top-center", closeOnClick: true, });
        }
       
        console.log("click Re-send otp res ", res)
        console.log('Resending OTP to:', phoneNumber);
        setTimer(160); // Reset timer
    };

    const handleLogin = async () => {
        // Add logic to verify the OTP and perform login
        const id = toast.loading("Please wait...");
        if (otp === '') {
            toast.warn("Please enter OTP", {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            })
            return;
        }

        const res = await verifyOtp(phoneNumber, otp);


        if (res.status === 200) {
            toast.update(id, {
                render: "Login success ", type: "success", isLoading: false, position: "top-center",
                autoClose: 3000, closeOnClick: true,
            });

            navigate('/home');
        }
        else{
            toast.update(id, {
                render: res.data, type: "error", isLoading: false, position: "top-center",
                autoClose: 60000, closeOnClick: true,
            });
        }

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
