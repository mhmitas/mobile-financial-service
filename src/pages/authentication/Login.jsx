import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { identifyInput } from '../../utils/utils';
import { axiosInstance } from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../../components/common/loading-components/LoadingSpinner';

const Login = () => {
    const navigate = useNavigate()
    const [processing, setProcessing] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const { setUser, user, authLoading } = useAuth()

    const onSubmit = async (data) => {
        setProcessing(true)
        try {
            let email = null;
            let number = null;
            const inputType = identifyInput(data.userIdentity)
            if (inputType === "email") {
                email = data.userIdentity;
            } else {
                number = data.userIdentity
            }
            const res = await axiosInstance.post("/api/login", { email, number, pin: data?.pin })
            console.log(res.data);
            setUser(res.data)
            toast.success('Log in success');
            setProcessing(false)
            navigate('/')
        } catch (err) {
            console.error("Login error:", err);
            toast.error(err?.response?.data?.message)
            setProcessing(false)
        }
    }

    if (authLoading) {
        return <LoadingSpinner />
    }
    if (user) {
        return <Navigate to="/" />
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="card w-96">
                <h1 className='text-3xl mb-10 text-center'><AuthPageTitle /></h1>
                <div className="card-body shadow-lg rounded-md border">
                    <h2 className="text-lg font-semibold text-center">Welcome back! <br />Please Log in to continue.</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Email or Phone  Number</span>
                            </label>
                            <input
                                type="text"
                                {...register('userIdentity')}
                                className={`input input-bordered`}
                            />
                            {errors.email && <span className="text-error">{errors.email.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Enter Your Pin</span>
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
                            <button disabled={processing} type="submit" className="btn btn-primary text-lg">
                                {processing ? <span className='loading loading-spinner text-primary'></span> : "Log In"}
                            </button>
                        </div>
                    </form>
                    <p className='my-1'>Don't have an account? Please <Link to="/sign-up" className='link link-primary'>Sign Up</Link> </p>
                </div>
            </div>
            <EnableCookiesMessage />
        </div>
    );
};

export default Login;


export function AuthPageTitle(params) {
    return (
        <span className='font-bold bg-gradient-to-r from-rose-500 via-blue-600 to-blue-500 text-white px-[12px] py-1 rounded-md cursor-default'>MhFins</span>
    )
}

export function EnableCookiesMessage() {
    return (
        <p className='fixed bg-blue-500 border border-blue-500 p-4 rounded-md bottom-10 left-10 text-white flex flex-col items-center justify-center'>
            <span className='text-lg font-bold'>We Use Cookies</span>
            <span>Please enable third party Cookies</span>
        </p>
    )
}