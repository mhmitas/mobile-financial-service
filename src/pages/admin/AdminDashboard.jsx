import React from 'react';
import SimpleHeader from '../../components/shared/header/SimpleHeader';

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-base-100 my-container">
            <SimpleHeader subtitle={"Access & manage your account and transactions efficiently."} />
            <div className="mx-auto">
                {/* Overview Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="shadow p-6 rounded-lg border">
                        <h2 className="text-2xl font-semibold mb-2">Total Users</h2>
                        <p className="text-4xl">1,234</p>
                    </div>
                    <div className="shadow p-6 rounded-lg border">
                        <h2 className="text-2xl font-semibold mb-2">Transactions</h2>
                        <p className="text-4xl">567</p>
                    </div>
                    <div className="shadow p-6 rounded-lg border">
                        <h2 className="text-2xl font-semibold mb-2">Revenue</h2>
                        <p className="text-4xl">- - -</p>
                    </div>
                </div>

                {/* Recent Transactions Section */}
                <div className="shadow p-6 rounded-lg border mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>001</td>
                                <td>John Doe</td>
                                <td>$100</td>
                                <td className="text-success">Completed</td>
                            </tr>
                            <tr>
                                <td>002</td>
                                <td>Jane Smith</td>
                                <td>$200</td>
                                <td className="text-warning">Pending</td>
                            </tr>
                            <tr>
                                <td>003</td>
                                <td>Mike Johnson</td>
                                <td>$150</td>
                                <td className="text-error">Failed</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* User Statistics Section */}
                <div className="shadow p-6 rounded-lg border mb-6">
                    <h2 className="text-2xl font-semibold mb-4">User Statistics</h2>
                    <p className="text-lg">Active Users: 1,000</p>
                    <p className="text-lg">Inactive Users: 234</p>
                </div>

                {/* Notifications Section */}
            </div>
        </div>
    );
};

export default AdminDashboard;


{/*<div className="shadow p-6 rounded-lg border">
    <h2 className="text-2xl font-semibold mb-4">Recent Notifications</h2>
    <div className="p-4 mb-4 rounded-lg bg-success text-success-content">
        <h3 className="font-bold">User Approved</h3>
        <p>John Doe has been approved as a user.</p>
    </div>
    <div className="p-4 mb-4 rounded-lg bg-warning text-warning-content">
        <h3 className="font-bold">Transaction Alert</h3>
        <p>Suspicious activity detected in Jane Doe's account.</p>
    </div>
    <div className="p-4 mb-4 rounded-lg bg-info text-info-content">
        <h3 className="font-bold">System Maintenance</h3>
        <p>Scheduled maintenance will occur at midnight.</p>
    </div>
</div> */}