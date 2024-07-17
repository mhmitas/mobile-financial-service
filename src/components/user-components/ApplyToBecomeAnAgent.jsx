import React, { useState } from 'react';
import { FaWpforms } from "react-icons/fa6";
import ApplyToBecomeAnAgentModal from '../modals/user-related-modals/ApplyToBecomeAnAgentModal';


const ApplyToBecomeAnAgent = () => {
    const [showApplyModal, setShowApplyModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowApplyModal(true)} className='btn btn-sm btn-secondary mt-2'>
                <FaWpforms size={18} />Apply To Become an Agent
            </button>
            {showApplyModal && <ApplyToBecomeAnAgentModal setShowModal={setShowApplyModal} />}
        </>
    );
};

export default ApplyToBecomeAnAgent;