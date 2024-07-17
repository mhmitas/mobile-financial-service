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
import PendingApprovalPage from '../pages/pending-pages/UserPendingPage';
import AdminUserManagement from '../pages/admin/AdminUserManagement';
import AdminManageTransaction from '../pages/admin/AdminManageTransactions';
import AdminAgentsManagement from '../pages/admin/AdminManageAgents';

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
            // admin's pages
            {
                path: '/admin-dashboard',
                element: <AdminDashboard />
            },
            {
                path: '/admin/manage-users',
                element: <AdminUserManagement />
            },
            {
                path: '/admin/manage-agents',
                element: <AdminAgentsManagement />
            },
            {
                path: '/admin/manage-transactions',
                element: <AdminManageTransaction />
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
    {
        path: '/user-pending',
        element: <PrivetRoute>
            <PendingApprovalPage />
        </PrivetRoute>
    },
])

export default router;