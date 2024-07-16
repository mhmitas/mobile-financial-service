import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivetRoute = ({ children }) => {

    let user = true

    if (user) {
        return children
    }

    return <Navigate to="/login" />
};

export default PrivetRoute;