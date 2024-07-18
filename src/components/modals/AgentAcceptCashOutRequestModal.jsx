import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import askConfirm from './askConfirm';

const AgentAcceptCashOutRequestModal = ({ setShowModal, currentUser, refetch, defaultNumber, defaultAmount, requestId, totalBalanceRefetch }) => {
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit } = useForm()


    const onSubmit = async (data) => {
        try {
            if (data.amount < 50) {
                return toast.error("Less than 50 taka is not allow")
            }
            // clientNumber, agentNumber, agentPin, amount
            const paymentInfo = {
                clientNumber: data?.clientNumber,
                agentNumber: currentUser?.number,
                agentPin: data?.pin,
                amount: data?.amount,
            }
            const ask = await askConfirm("Please confirm you want to make this transaction?", <div className='font-semibold text-primary'>
                <p>Client Phone: {data?.clientNumber}</p>
                <p>Amount: {data?.amount} BDT</p>
            </div>)
            if (!ask) {
                return setShowModal(false)
            };
            // post to db
            const res = await axiosSecure.post("/api/cash-out", paymentInfo)
            console.log(res.data);
            await axiosSecure.delete(`/api/agent/delete-request/${requestId}`)
            if (res.data?.updateAgentBalance?.modifiedCount > 0 && res.data?.updateClientBalance?.modifiedCount > 0) {
                toast.success("transaction success")
            }
            refetch()
            totalBalanceRefetch()
            setShowModal(false)
        } catch (error) {
            console.log("transaction error:", error);
            toast?.error(error?.response?.data?.message || "Something went wrong! Please try again latter")
            // setShowModal(false)
        }
    };


    return (
        <div className='fixed inset-0 bg-black bg-opacity-15 z-40 flex items-center justify-center'>
            <div className='max-w-lg w-full mx-auto bg-base-100 p-8 rounded-lg'>
                <h1 className="text-xl font-bold mb-2">Accept Cashout Request and Receive Money</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-8'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Client's Phone Number</span>
                            </label>
                            <input type="tel" readOnly defaultValue={defaultNumber} {...register("clientNumber")} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Cash Amount</span>
                            </label>
                            <input type="number" readOnly defaultValue={defaultAmount} {...register("amount")} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Enter Your Pin</span>
                            </label>
                            <input type="number" {...register("pin")} className="input input-bordered" required />
                        </div>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <button onClick={() => setShowModal(false)} type="button" className="btn hover:btn-error">Cancel</button>
                        <button type="submit" className="btn btn-primary">Receive</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AgentAcceptCashOutRequestModal;