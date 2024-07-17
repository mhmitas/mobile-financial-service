import React from 'react';
import SimpleHeader from '../../components/shared/header/SimpleHeader';

const AdminAgentsManagement = () => {
    return (
        <div className="my-container min-h-screen">
            <SimpleHeader title={"Manage Users"} />
            <div className="">
                {/* User List Table */}
                <div className="bg-base-100 p-6 rounded-lg shadow">
                    <div className='flex flex-col md:flex-row justify-between mb-4'>
                        <h2 className="text-2xl font-semibold">Users</h2>
                        <div>
                            <div role="tablist" className="tabs tabs-boxed">
                                <a role="tab" className="tab">Pending</a>
                                <a role="tab" className="tab tab-active">Agent Request</a>
                                <a role="tab" className="tab">Tab 3</a>
                            </div>
                        </div>
                        <div>
                            <input className='input input-bordered input-sm p-4' type="text" placeholder='🔎 Search user...' />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>001</td>
                                    <td>John Doe</td>
                                    <td>john@example.com</td>
                                    <td>User</td>
                                    <td className="text-warning">
                                        <span className='badge badge-outline'>Pending</span>
                                    </td>
                                    <td>
                                        <button className="btn btn-primary btn-sm mr-2">Approve</button>
                                        <button className="btn btn-error btn-sm">Delete</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>002</td>
                                    <td>Jane Smith</td>
                                    <td>jane@example.com</td>
                                    <td>Agent</td>
                                    <td className="text-success">Approved</td>
                                    <td>
                                        <button className="btn btn-primary btn-sm mr-2">Block</button>
                                        <button className="btn btn-error btn-sm">Delete</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>003</td>
                                    <td>Mike Johnson</td>
                                    <td>mike@example.com</td>
                                    <td>Admin</td>
                                    <td className="text-success">Approved</td>
                                    <td>
                                        <button className="btn btn-primary btn-sm mr-2">Approve</button>
                                        <button className="btn btn-error btn-sm">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAgentsManagement;
