import React, { createContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('John Doe');

    return (
        <MyContext.Provider value={{ count, setCount, name, setName }}>
            {children}
        </MyContext.Provider>
    );
};

export { MyContext, MyContextProvider };