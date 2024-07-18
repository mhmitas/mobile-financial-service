import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import askConfirm from './askConfirm';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const UserCashOutRequestModal = ({ setShowModal, currentUser, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit } = useForm()

    const onSubmit = async (data) => {
        try {
            if (parseFloat(data.amount) < 50) {
                return toast.error("Less than 50 taka is now allow")
            }
            const ask = await askConfirm("Are you sure? Do you want to make this cash out request?", <div className=' font-semibold text-primary'>
                <p>Agent Phone: {data?.agentNumber}</p>
                <p>Amount: {data?.amount} BDT</p>
            </div>)
            if (!ask) {
                return setShowModal(false)
            };
            const requestData = {
                agentNumber: data.agentNumber,
                amount: data?.amount,
                userNumber: currentUser?.number,
                requestType: "cash-out",
                pin: data?.pin
            }
            const res = await axiosSecure.post(`/api/user/cash-request`, requestData)
            console.log(res.data);
            if (res.data?.insertedId) {
                toast.success("Your cash out request has been passed to the agent. Please wait until the agent approves your request")
            }
            refetch()
            setShowModal(false)
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong!!!")
            console.error("cash out req error:", error);
            setShowModal(false)
        }
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-15 z-40 flex items-center justify-center'>
            <div className='max-w-lg w-full mx-auto bg-base-100 p-8 rounded-lg'>
                <h1 className="text-2xl font-bold mb-2">Send request to an agent to cash in</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-8'>
                        <div className="form-control">
                            <label className="label">
                                <span className="">Enter Agent's Phone Number</span>
                            </label>
                            <input type="tel" {...register("agentNumber")} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="">Enter Amount</span>
                            </label>
                            <input type="number" {...register("amount")} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="">Enter Your Pin</span>
                            </label>
                            <input type="number" {...register("pin")} className="input input-bordered" required />
                        </div>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <button onClick={() => setShowModal(false)} type="button" className="btn hover:btn-error">Cancel</button>
                        <button type="submit" className="btn btn-primary">Send Request</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserCashOutRequestModal;