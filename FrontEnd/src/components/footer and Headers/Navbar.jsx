import { React, useState, useEffect,useContext } from 'react'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { signOut, isSignIn } from '../../services/api'
import userIcon from '../../assets/user.svg'
import logo from '../../assets/logo.svg'
import { AuthContext } from '../../AuthContext'

export const Navbar = () => {
    const [userSignIn, setUserSignIn] = useState(isSignIn);
    const navigate = useNavigate();

    const { logout } = useContext(AuthContext);

    const handleSignOut = (e) => {
        logout()
    }
    const handleUserInfo = (e) => {
        e.preventDefault();
        navigate('/UserInfo');
    }

    useEffect(() => {
        setUserSignIn(isSignIn);
    }, [userSignIn]);


    return (
        <div>
            <nav className="navbar">
                <div className="navbar-left">
                    <Link to='/'>
                        <img src={logo} className='Logo' alt='logo' />
                    </Link>
                </div>
                {
                    userSignIn ? (<div className="navbar-right">
                        <Link to='/'>
                            <div onClick={handleSignOut} style={{ style: 'none' }} >Sign Out</div>
                        </Link>

                        <img onClick={handleUserInfo} className='userIcon' src={userIcon} alt='userIcon'></img>
                    </div>) : (
                        <div className="navbar-right">
                            <Link to='/login'>
                                <button >Sign In</button>
                            </Link>
                            <Link to='/register'>
                                <button>Register</button>
                            </Link>
                        </div>
                    )
                }
            </nav >
        </div >
    )
}


