import React, {useState, createContext, useEffect} from 'react';
import { GetToken } from '../services/IdentityServer';

export const AuthContext = createContext(["", () => {}]);

export const AuthProvider = (props) => {
    const [token, setToken] = useState('');

    const loadToken = async () => {
        const currentToken = await GetToken();
        setToken(currentToken);
    }

    useEffect(() => {
        loadToken();
    }, []);

    return (
        <AuthContext.Provider value={[token, setToken]}>
            {props.children}
        </AuthContext.Provider>
    )
}