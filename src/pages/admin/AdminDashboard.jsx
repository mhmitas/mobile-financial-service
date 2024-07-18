import React from 'react';
import SimpleHeader from '../../components/shared/header/SimpleHeader';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AdminDashboard = () => {
    const axiosSecure = useAxiosSecure()

    const { data: stats, isPending } = useQuery({
        queryKey: ["api-admin-stats"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/api/admin/stats")
            console.log(data);
            return data
        }
    })

    return (
        <div className="min-h-screen bg-base-100 my-container">
            <SimpleHeader subtitle={"Access & manage your account and transactions efficiently."} />
            <div className="mx-auto">
                {/* Overview Section */}
                <div className="stats shadow w-full stats-vertical md:stats-horizontal my-24">
                    <div className="stat place-items-center">
                        <div className="stat-title">Total Users</div>
                        <div className="stat-value">{stats?.totalUsers}</div>
                    </div>

                    <div className="stat place-items-center">
                        <div className="stat-title">Total Transactions</div>
                        <div className="stat-value">{stats?.totalTransactions}</div>
                    </div>

                    <div className="stat place-items-center">
                        <div className="stat-title">Revenue</div>
                        <div className="stat-value">{stats?.revenue?.revenue} BDT</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;