import React from 'react';
import { useForm } from "react-hook-form";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import askConfirm from './askConfirm';
import toast, { } from "react-hot-toast";

const SendMoneyModal = ({ setShowModal, currentUser, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit } = useForm()

    const onSubmit = async (data) => {
        try {
            if (data.amount < 50) {
                return toast.error("Less than 50 taka is not allow")
            }
            const paymentInfo = {
                recipientNumber: data.recipientNumber,
                senderNumber: currentUser?.number,
                senderPin: data?.pin,
                amount: data.amount,
            }
            const ask = await askConfirm("Are you sure? Do you want to make this transaction?", <div className='text-lg font-semibold'>
                <p>Recipient Phone: 0198914</p>
                <p>Amount: 0198914 BDT</p>
            </div>)
            if (!ask) return;
            // post to db
            const res = await axiosSecure.post("/api/send-money", paymentInfo)
            console.log(res.data);
            if (res.data?.updateSenderBalance?.modifiedCount > 0 && res.data?.updateRecipientBalance?.modifiedCount > 0) {
                toast.success("transaction success")
            }
            refetch()
            setShowModal(false)
        } catch (error) {
            console.log("transaction error:", error);
            toast?.error(error?.response?.data?.message || "Something went wrong! Please try again latter")
            setShowModal(false)
        }
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-15 z-40 flex items-center justify-center'>
            <div className='max-w-lg w-full mx-auto bg-base-100 p-8'>
                <h1 className="text-3xl font-bold mb-2">Send Money</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-8'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Enter Phone Number</span>
                            </label>
                            <input type="tel" {...register("recipientNumber")} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Enter Amount</span>
                            </label>
                            <input type="number" {...register("amount")} className="input input-bordered" required />
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
                        <button type="submit" className="btn btn-primary">Send</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SendMoneyModal;