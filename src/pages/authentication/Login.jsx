import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { identifyInput } from '../../utils/utils';
import { axiosInstance } from '../../hooks/useAxiosSecure';

const Login = () => {
    const navigate = useNavigate()
    const [processing, setProcessing] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        setProcessing(true)
        try {
            console.log(data);
            console.log(identifyInput(data.userIdentity));
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
            return
            toast.success('Log in success');
            setProcessing(false)
            setErrorMessage('')
            navigate('/')
        } catch (err) {
            console.error(err);
            setErrorMessage(err.message?.slice(10))
            setProcessing(false)
        }
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
                            <button type="submit" className="btn btn-primary text-lg">Sign In</button>
                        </div>
                    </form>
                    <p className='my-1'>Don't have an account? Please <Link to="/sign-up" className='link link-primary'>Sign Up</Link> </p>
                </div>
            </div>
        </div>
    );
};

export default Login;


export function AuthPageTitle(params) {
    return (
        <span className='font-bold bg-gradient-to-r from-rose-500 via-blue-600 to-blue-500 text-white px-[12px] py-[6px] rounded-md cursor-default'>MhFins</span>
    )
}