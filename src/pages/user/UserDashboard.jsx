import React, { useState } from 'react';
import SimpleHeader from '../../components/shared/header/SimpleHeader';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import SendMoneyModal from '../../components/modals/SendMoneyModal';

const UserDashboard = () => {
    const [showSendMoneyModal, setShowSendMoneyModal] = useState(false)
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data: totalBalance = 0, isPending, refetch } = useQuery({
        queryKey: ["users-total-balance"],
        queryFn: async () => {
            const { data } = await axiosSecure(`/api/user/total-balance/${user?.email}`)
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

                    <div className="stat place-items-center">
                        <div className="stat-title">Total Transactions</div>
                        <div className="stat-value text-secondary">4,200</div>
                    </div>

                    <div className="stat place-items-center">
                        <div className="stat-title">Pending Payments</div>
                        <div className="stat-value">1,200</div>
                    </div>
                </div>
                <div className='flex flex-wrap items-center gap-4'>
                    <span onClick={() => setShowSendMoneyModal(true)} className='card-body cursor-pointer shadow rounded-md bg-primary text-xl font-bold text-primary-content text-center hover:bg-info'>Send Money</span>
                    <span className='card-body cursor-pointer shadow rounded-md bg-primary text-xl font-bold text-primary-content text-center hover:bg-info'>Cash Out</span>
                    <span className='card-body cursor-pointer shadow rounded-md bg-primary text-xl font-bold text-primary-content text-center hover:bg-info'>Add Money</span>
                    <span className='card-body cursor-pointer shadow rounded-md bg-primary text-xl font-bold text-primary-content text-center hover:bg-info tooltip' data-tip="Hard Coded">Payment</span>
                </div>
            </div>
            {showSendMoneyModal && <SendMoneyModal setShowModal={setShowSendMoneyModal} currentUser={user} refetch={refetch} />}
        </section>
    );
};

export default UserDashboard;