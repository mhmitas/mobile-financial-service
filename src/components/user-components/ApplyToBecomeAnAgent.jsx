import React, { useState } from 'react';
import { FaWpforms } from "react-icons/fa6";
import ApplyToBecomeAnAgentModal from '../modals/user-related-modals/ApplyToBecomeAnAgentModal';
import useAuth from '../../hooks/useAuth';
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from '../../hooks/useAxiosSecure';

const ApplyToBecomeAnAgent = () => {
    const [showApplyModal, setShowApplyModal] = useState(false)

    const { data: user = {}, refetch, isPending } = useQuery({
        queryKey: ["user-at-ApplyToBecomeAnAgent"],
        queryFn: async () => {
            const { data } = await axiosInstance("/api/current-user")
            return data
        }
    })

    if (isPending) {
        return <span>Loading...</span>
    }

    if (user?.wantToBecomeAgent || user?.role === "agent") {
        return (
            <p className='bg-warning text-warning-content p-1 rounded-lg mt-2 mx-2'>
                Your becoming agent request is pending
            </p>
        )
    }

    return (
        <>
            <button onClick={() => setShowApplyModal(true)} className='btn btn-sm btn-secondary mt-2'>
                <FaWpforms size={18} />Apply To Become an Agent
            </button>
            {showApplyModal && <ApplyToBecomeAnAgentModal setShowModal={setShowApplyModal} refetch={refetch} />}
        </>
    );
};

export default ApplyToBecomeAnAgent;