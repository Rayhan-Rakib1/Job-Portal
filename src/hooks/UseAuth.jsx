import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const UseAuth = () => {
    const context = useContext(AuthContext);

    return context; 
};

export default UseAuth;