import {React,useEffect} from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import { isSignIn, signOut } from '../../services/api'

export const Navbar = () => {
    useEffect(()=>{

        
    })

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-left">
                    <span>ShareYourData</span>
                </div>
                {isSignIn ? (<div>
                    <Link to='/'>
                        <button onClick={signOut()} >Sign Out</button>
                    </Link>
                </div>) : (
                    <div className="navbar-right">
                        <Link to='/login'>
                            <button >Sign In</button>
                        </Link>
                        <Link to='/register'>
                            <button>Register</button>
                        </Link>
                    </div>
                )}
            </nav>
        </div>
    )
}
