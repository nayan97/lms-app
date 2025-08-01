import React, { useContext } from 'react';
import { AuthContext } from '../context/Auth';
import { Navigate } from 'react-router';

export const RequireAuth = ({children}) => {
    const {user} = useContext(AuthContext);

    if (!user){
        return <Navigate to={`/account/login`}></Navigate>
    }
    return children;
}
