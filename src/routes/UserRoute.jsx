import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const UserRoute = ({ children }) => {
    const { user, authLoading } = useAuth()

    if (authLoading) {
        return <div className='absolute top-1/2 left-1/2'>
            <span className='loading loading-spinner loading-lg text-info'></span>
        </div>
    }

    if (user && user?.role === "user") {
        return children
    }

    return <Navigate replace={true} to="/login" />
};

export default UserRoute;