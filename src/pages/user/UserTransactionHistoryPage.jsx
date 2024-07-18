import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import CenterLoadingComponent from '../../components/common/loading-components/CenterLoadingComponent';
import SimpleHeader from '../../components/shared/header/SimpleHeader';

const UserTransactionHistoryPage = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data: transactions = [], isPending } = useQuery({
        queryKey: ["UserTransactionHistoryPage-transactions", user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/api/user/transactions/${user?.email}`)
            return data
        }
    })

    return (
        <div className='my-container'>
            <SimpleHeader title={"Your transactions history"} />
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
                        {transactions.map((transaction, index) => <UserTransactionsHistoryTableRow key={transaction._id} transaction={transaction} index={index} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTransactionHistoryPage;



export function RecentTransactions({ totalBalance }) {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data: transactions = [], isPending } = useQuery({
        queryKey: ["UserTransactionHistoryPage-transactions", user?.email, totalBalance],
        queryFn: async () => {
            const { data } = await axiosSecure(`/api/user/transactions/${user?.email}?limit=10`)
            return data
        }
    })


    return (
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
            <div className="overflow-x-auto">
                {isPending && <CenterLoadingComponent />}
                {transactions?.length < 1 && <p>No recent transactions</p>}
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
                        {transactions.map((transaction, index) => <UserTransactionsHistoryTableRow key={transaction._id} transaction={transaction} index={index} />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}



export function UserTransactionsHistoryTableRow({ transaction, index }) {
    return (
        <tr>
            <th>{index}</th>
            <td className='cursor-copy tooltip' data-tip="Click to copy" onClick={() => navigator.clipboard.writeText(transaction?._id)}>{transaction._id}</td>
            <td>{new Date(transaction.date).toLocaleDateString()}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.transactionType}</td>
        </tr>
    )
}