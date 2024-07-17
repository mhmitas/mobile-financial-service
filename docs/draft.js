import React, { useState } from 'react';

const ApplyToBecomeAnAgentModal = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send request to backend
        const response = await fetch('/api/request-agent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        });

        const data = await response.json();

        if (data.success) {
            setStatus('Your request has been submitted and is pending approval.');
        } else {
            setStatus('There was an error submitting your request. Please try again.');
        }
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-15 z-40 flex items-center justify-center'>
            <div className='max-w-lg w-full mx-auto bg-base-100 p-6'>
                <h1 className="text-3xl font-bold mb-6">Request to Become an Agent</h1>
                {status && <p className="mb-4">{status}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="input input-bordered w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="input input-bordered w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            className="textarea textarea-bordered w-full"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <button type="submit" className="btn btn-primary btn-sm">Submit Request</button>
                        <button type="submit" className="btn btn-sm">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplyToBecomeAnAgentModal;