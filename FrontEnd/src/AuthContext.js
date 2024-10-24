import React, { createContext, useState,useEffect } from 'react';
import { signOut } from './services/api';
import { authenticationToken } from './services/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('authToken', token);
        } else {
            localStorage.removeItem('authToken');
        }
    }, [token]);
    
    const login = () => {
        setToken(authenticationToken);
    };

    const logout = () => {
        setToken(null);
        signOut()
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
