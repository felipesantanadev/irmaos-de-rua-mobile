import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoginStack from '../routes/loginStack';
import Root from '../routes/root';

const RootPage = () => {
    const [token, setToken] = useContext(AuthContext);

    return (
        <>
            {
                token ? (
                    <Root />
                )
                : (
                    <LoginStack />
                )
            }
        </>
    );
}

export default RootPage;