import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivetRoute = ({ children }) => {
    const { user, authLoading } = useAuth()

    if (authLoading) {
        return <div className='absolute top-1/2 left-1/2'>
            <span className='loading loading-spinner loading-lg text-info'></span>
        </div>
    }

    if (user) {
        return children
    }

    return <Navigate to="/login" />
};

export default PrivetRoute;