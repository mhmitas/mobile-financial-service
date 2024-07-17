import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthPageTitle } from './Login';
import { saveUserInDB } from '../../utils/saveUserInDB';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../../components/common/loading-components/LoadingSpinner';

const Signup = () => {
    const navigate = useNavigate()
    const [processing, setProcessing] = useState(false);
    const { setUser, user, authLoading } = useAuth()
    const axiosSecure = useAxiosSecure()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        // console.log(data);
        setProcessing(true)
        try {
            const res = await saveUserInDB(data)
            if (res?.data?.insertedId) {
                const res = await axiosSecure("/api/current-user")
                setUser(res?.data)
                toast.success('Sign Up Success')
                reset()
                navigate('/')
            }
            setProcessing(false)
        } catch (err) {
            console.error("sign up error:", err);
            setProcessing(false)
        }
    }
    console.log(processing);

    if (authLoading) {
        return <LoadingSpinner />
    }
    if (user) {
        return <Navigate replace to="/" />
    }

    return (
        <div className="flex justify-center items-center min-h-screen py-5">
            <div className="card max-w-md w-full">
                <h1 className='text-3xl mb-10 text-center'><AuthPageTitle /></h1>
                <div className="card-body shadow-lg rounded-md border relative">
                    <h2 className="text-lg font-semibold text-center">Create a new account.</h2>
                    {/* Registration form */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                {...register('name')} required
                                className={`input input-bordered`}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                {...register('email')} required
                                className={`input input-bordered`}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input
                                type="tel"
                                {...register('number')} required
                                className={`input input-bordered`}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Create a 5 digit Pin</span>
                            </label>
                            <input
                                type="number"
                                {...register('pin', { required: true, minLength: 5, maxLength: 5 })} required
                                className={`input input-bordered`}
                            />
                            {errors.pin && errors.pin.type === "minLength" && (<span className='text-error'>Pin must be 5 numbers</span>)}
                            {errors.pin && errors.pin.type === "maxLength" && (<span className='text-error'>Pin must be 5 numbers</span>)}
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary text-lg">Sign Up</button>
                        </div>
                    </form>
                    <p className='my-1'>Already have an account? Please <Link to="/login" className='link link-primary'>Log in</Link> </p>
                    {processing && <div className='absolute inset-0 bg-black/10 flex items-center justify-center rounded-lg'><span className='loading loading-spinner loading-lg text-primary m-auto'></span></div>}
                </div>
            </div>
        </div>
    );
};

export default Signup;