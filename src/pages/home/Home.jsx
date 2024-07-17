import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Home = () => {
    const { user, authLoading } = useAuth()
    let userRole = user?.role
    console.log(userRole);

    if (authLoading) {
        return <div className='absolute top-1/2 left-1/2'>
            <span className='loading loading-spinner loading-lg text-primary'></span>
        </div>
    }

    if (!user) {
        return <Navigate to="/login" />
    }

    if (user && userRole === "user") {
        return <Navigate to="/user-dashboard" />
    } else if (user && userRole === "agent") {
        return <Navigate to="/agent-dashboard" />
    } else if (user && userRole === "admin") {
        return <Navigate to="/admin-dashboard" />
    } else if (user && userRole === "pending") {
        return <Navigate to="/user-pending" />
    } else {
        return <Navigate to="/login" />
    }

};

export default Home;