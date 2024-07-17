import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import toast, { } from "react-hot-toast";

const ApplyToBecomeAnAgentModal = ({ setShowModal, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target
        try {
            let message = form.message.value
            const data = {
                wantToBecomeAgent: true,
                message: message
            }
            const res = await axiosSecure.patch(`/api/user/become-agent-request/${user?.email}`, data)
            if (res.data.modifiedCount > 0) {
                toast.success("Your request has been submitted and is pending approval.")
                setShowModal(false)
            }
            refetch()
            console.log(res.data);
            setShowModal(false)

        } catch (error) {
            console.error(error);
            toast.error("There was an error submitting your request. Please try again")
            setShowModal(false)
        }
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-15 z-40 flex items-center justify-center'>
            <div className='max-w-lg w-full mx-4 bg-base-100 p-6 rounded-lg max-h-[95vh] overflow-y-auto'>
                <h1 className="text-xl font-bold md:font-semibold mb-2 md:mb-4">Request to Become an Agent</h1>
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
                        <button onClick={() => setShowModal(false)} type="button" className="btn btn-sm">Cancel</button>
                        <button type="submit" className="btn btn-primary btn-sm">Send</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplyToBecomeAnAgentModal;