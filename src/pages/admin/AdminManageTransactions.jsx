import React from 'react';
import SimpleHeader from '../../components/shared/header/SimpleHeader';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useQuery } from "@tanstack/react-query";
import CenterLoadingComponent from '../../components/common/loading-components/CenterLoadingComponent';
import { UserTransactionsHistoryTableRow } from '../user/UserTransactionHistoryPage';
import AdminManageTransactionsTableRow from '../../components/table-rows/admin-table-rows/AdminManageTransactionsTableRow';

const AdminManageTransaction = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data: transactions = [], isPending } = useQuery({
        queryKey: ["admin-all-transactions", user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/api/admin/all-transactions`)
            console.log('data');
            return data
        }
    })


    return (
        <div className="min-h-screen my-container">
            <SimpleHeader title={"Transaction Management"} />
            <div className="max-w-7xl mx-auto">
                {/* Transaction List Table */}
                <div className="overflow-x-auto">
                    {isPending && <CenterLoadingComponent />}
                    {transactions?.length < 1 && <p>You have not any transactions</p>}
                    <table className="table mb-28">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => <AdminManageTransactionsTableRow key={transaction._id} transaction={transaction} index={index} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminManageTransaction;
