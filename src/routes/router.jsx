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
import AdminRoute from './AdminRoutes';
import AgentRoute from './AgentRoute';
import UserRoute from './UserRoute';
import AgentCashInRequests from '../pages/agent/AgentCashInRequests';
import AgentCashOutRequests from '../pages/agent/AgentCashOutRequests';

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
            // user's routes
            {
                path: '/user-dashboard',
                element: <UserRoute>
                    <UserDashboard />
                </UserRoute>
            },
            // agent's routes
            {
                path: '/agent-dashboard',
                element: <AgentRoute>
                    <AgentDashboard />
                </AgentRoute>,
            },
            // admin's routes
            {
                path: '/admin-dashboard',
                element: <AdminRoute>
                    <AdminDashboard />
                </AdminRoute>
            },
            {
                path: '/admin/manage-users',
                element: <AdminRoute>
                    <AdminUserManagement />
                </AdminRoute>
            },
            {
                path: '/admin/manage-agents',
                element: <AdminRoute>
                    <AdminAgentsManagement />
                </AdminRoute>
            },
            {
                path: '/admin/manage-transactions',
                element: <AdminRoute>
                    <AdminManageTransaction />
                </AdminRoute>
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