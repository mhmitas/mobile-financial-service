import React, { useState } from 'react';

const ApplyToBecomeAnAgentModal = ({ setShowModal }) => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target
        let message = form.message.value
        console.log({ message });

        // if (data.success) {
        //     setStatus('Your request has been submitted and is pending approval.');
        // } else {
        //     setStatus('There was an error submitting your request. Please try again.');
        // }
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-15 z-40 flex items-center justify-center'>
            <div className='max-w-lg w-full mx-auto bg-base-100 p-6 rounded-lg max-h-[95vh] overflow-y-auto'>
                <h1 className="text-xl font-bold mb-4">Request to Become an Agent</h1>
                {status && <p className="mb-4">{status}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="label" htmlFor="message">Message</label>
                        <textarea
                            name="message"
                            className="textarea textarea-bordered w-full"
                            required
                        />
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <button onClick={() => setShowModal(false)} type="submit" className="btn btn-sm">Cancel</button>
                        <button type="submit" className="btn btn-primary btn-sm">Submit Request</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplyToBecomeAnAgentModal;