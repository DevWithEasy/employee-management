import React from 'react';
import useStore from '../_store/userStore';
import { Navigate } from 'react-router-dom';

const Protected = ({children}) => {
    const {isAuth} = useStore()
    return isAuth ? children : <Navigate to='signin'/>
};

export default Protected;