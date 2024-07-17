import React from 'react';
import SimpleHeader from '../../components/shared/header/SimpleHeader';

const AdminManageTransaction = () => {
    return (
        <div className="min-h-screen my-container">
            <SimpleHeader title={"Transaction Management"} />
            <div className="max-w-7xl mx-auto">
                {/* Transaction List Table */}
                <div className="bg-base-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>001</td>
                                <td>John Doe</td>
                                <td>$100</td>
                                <td>2024-07-01</td>
                                <td className="text-success">Completed</td>
                                <td>
                                    <button className="btn btn-info btn-sm mr-2">View</button>
                                    <button className="btn btn-warning btn-sm">Reverse</button>
                                </td>
                            </tr>
                            <tr>
                                <td>002</td>
                                <td>Jane Smith</td>
                                <td>$200</td>
                                <td>2024-07-02</td>
                                <td className="text-warning">Pending</td>
                                <td>
                                    <button className="btn btn-info btn-sm mr-2">View</button>
                                    <button className="btn btn-warning btn-sm">Reverse</button>
                                </td>
                            </tr>
                            <tr>
                                <td>003</td>
                                <td>Mike Johnson</td>
                                <td>$150</td>
                                <td>2024-07-03</td>
                                <td className="text-error">Failed</td>
                                <td>
                                    <button className="btn btn-info btn-sm mr-2">View</button>
                                    <button className="btn btn-warning btn-sm">Reverse</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminManageTransaction;
