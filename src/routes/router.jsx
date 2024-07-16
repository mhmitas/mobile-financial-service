import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from '../layouts/root';
import Home from '../pages/home/Home';
import Login from '../pages/authentication/Login';
import Signup from '../pages/authentication/Signup';
import UserDashboard from '../pages/user/UserDashboard';
import AgentDashboard from '../pages/agent/AgentDashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';
import PrivetRoute from './PrivetRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivetRoute>
            <Root />
        </PrivetRoute>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/user-dashboard',
                element: <UserDashboard />
            },
            {
                path: '/agent-dashboard',
                element: <AgentDashboard />
            },
            {
                path: '/admin-dashboard',
                element: <AdminDashboard />
            },
        ],
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/sign-up',
        element: <Signup />
    },
])

export default router;