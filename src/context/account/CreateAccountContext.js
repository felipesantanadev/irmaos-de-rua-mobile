import React, {useState, createContext } from 'react';

export const CreateAccountContext = createContext();

export const CreateAccountProvider = (props) => {
    const [createAccount, setCreateAccount] = useState({});

    return (
        <CreateAccountContext.Provider value={[createAccount, setCreateAccount]}>
            {props.children}
        </CreateAccountContext.Provider>
    )
}