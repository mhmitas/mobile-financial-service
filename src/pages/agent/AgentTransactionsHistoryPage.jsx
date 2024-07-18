import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import SimpleHeader from '../../components/shared/header/SimpleHeader';
import CenterLoadingComponent from '../../components/common/loading-components/CenterLoadingComponent';
import { UserTransactionsHistoryTableRow } from '../user/UserTransactionHistoryPage';

const AgentTransactionsHistoryPage = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data: transactions = [], isPending } = useQuery({
        queryKey: ["AgentTransactionsHistoryPage-transactions", user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/api/agent/transactions/${user?.email}?limit=20`)
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

export default AgentTransactionsHistoryPage;