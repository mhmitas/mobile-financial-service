import React, { useEffect } from 'react';
import SimpleHeader from '../../components/shared/header/SimpleHeader';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { NavLink, Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import AgentDashboardPageTabs from '../../components/agent-components/AgentDashboardPageTabs';
import queryString from 'query-string';
import AgentCashInRequests from './AgentCashInRequests';
import AgentCashOutRequests from './AgentCashOutRequests';

const AgentDashboard = () => {
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const [searchParams, setSearchParams] = useSearchParams()
    const { user } = useAuth()

    useEffect(() => {
        if (!searchParams.get('show')) {
            const query = queryString.stringifyUrl({
                url: '/agent-dashboard',
                query: { show: "cash-in-requests" }
            })
            navigate(query, { replace: true })
        }
    }, [searchParams.get('show')])

    const showRequests = searchParams.get("show")

    const { data: totalBalance = 0, isPending, refetch: totalBalanceRefetch } = useQuery({
        queryKey: ["users-total-balance"],
        queryFn: async () => {
            const { data } = await axiosSecure(`/api/agent/total-balance/${user?.email}`)
            return data
        }
    })

    return (
        <section className='my-container'>
            <SimpleHeader subtitle={"Access & manage your account and transactions efficiently."} />
            <div className='space-y-16'>
                <div className="stats shadow steps-vertical sm:stats-horizontal w-full">
                    <div className="stat place-items-center">
                        <div className="stat-title">Account Balance🫰</div>
                        <div className="stat-value">{totalBalance.balance?.toLocaleString() || totalBalance.balance} Taka</div>
                    </div>
                </div>
            </div>
            <div className='divider'></div>
            <div className='flex justify-center mb-6'>
                <AgentDashboardPageTabs />
            </div>
            <div>
                {showRequests === "cash-in-requests" && <AgentCashInRequests user={user} totalBalanceRefetch={totalBalanceRefetch} />}
                {showRequests === "cash-out-requests" && <AgentCashOutRequests user={user} totalBalanceRefetch={totalBalanceRefetch} />}
            </div>
        </section>
    );
};

export default AgentDashboard;