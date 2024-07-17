import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import CenterLoadingComponent from '../../components/common/loading-components/CenterLoadingComponent';
import AgentCashInRequestsTableRow from '../../components/table-rows/AgentCashInRequestsTableRow';

const AgentCashInRequests = ({ user, totalBalanceRefetch }) => {
    const axiosSecure = useAxiosSecure()

    const { data: requests = [], isPending, refetch } = useQuery({
        queryKey: ["agent-cash-in-requests"],
        queryFn: async () => {
            const { data } = await axiosSecure(`/api/agent/cash-in-requests/${user?.email}`)
            // console.log(data);
            return data
        }
    })

    return (
        <div >
            <div className="overflow-x-auto">
                {isPending && <CenterLoadingComponent />}
                <table className="table mb-28">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Phone Number</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th className='text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests?.map((request, index) => <AgentCashInRequestsTableRow request={request} index={index} key={index} refetch={refetch} currentUser={user} totalBalanceRefetch={totalBalanceRefetch} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AgentCashInRequests;

