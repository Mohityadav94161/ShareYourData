import React from 'react'
import './navbar.css'

export const Navbar = () => {
    return (
        <div>
            <nav className="navbar">
                <div className="navbar-left">
                    <span>ShareYourData</span>
                </div>
                <div className="navbar-right">
                    <button>Sign In</button>
                    <button>Register</button>
                </div>
            </nav>
        </div>
    )
}
