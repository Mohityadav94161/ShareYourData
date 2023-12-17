import { React, useRef } from 'react'
import './footer.css';
import logo from '../../assets/newlogo2.svg';
import { FeedbackForm } from './Feedbackform';
import feedbackIcon from '../../assets/feedback.svg'


export const Footer = () => {

    const feedbackRef = useRef();
    const handleDivClick = () => {
        feedbackRef.current.click();
    };
    return (
        <div className='mainFooter'>
            <footer className="landing-footer">
                <div>
                    <img className="footerlogo" src={logo} alt='logo' />
                    
                    
                </div>
                <div className='feedback' onClick={handleDivClick} >
                    <img src={feedbackIcon} alt='feedback' style={{height:'50px'}}></img>
                    click here for FeedBack and suggestions
                </div>
                <FeedbackForm ref={feedbackRef} />
                
               
            </footer>
            <p style={{margin:'0'}}>Contact us at <br /> <strong>shareyourdata@gmail.com</strong> </p>
        </div>
    )
}
