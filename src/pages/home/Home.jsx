import React from 'react';
import { Navigate } from 'react-router-dom';

const Home = () => {
    let user = true;
    let userRole = "user"

    if (!user) {
        return <Navigate to="/login" />
    }

    if (user && userRole === "user") {
        return <Navigate to="/user-dashboard" />
    } else if (user && userRole === "agent") {
        return <Navigate to="/agent-dashboard" />
    } else if (user && userRole === "admin") {
        return <Navigate to="/admin-dashboard" />
    }

};

export default Home;