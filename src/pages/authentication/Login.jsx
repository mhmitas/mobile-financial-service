import React, { useState } from 'react';
import Container from '../../components/common/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Login = () => {
    const { loginUser } = useAuth()
    const navigate = useNavigate()
    const [processing, setProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        setProcessing(true)
        try {
            const { user } = await loginUser(data?.email, data?.password)
            console.log(user);
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
                            <label className="label" htmlFor="email">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register('email', { required: 'Email is required' })}
                                className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
                            />
                            {errors.email && <span className="text-error">{errors.email.message}</span>}
                        </div>
                        <div className="form-control mt-1">
                            <label className="label" htmlFor="password">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                {...register('password', { required: 'Password is required' })}
                                className={`input input-bordered ${errors.password ? 'input-error' : ''}`}
                            />
                            {errors.password && <span className="text-error">{errors.password.message}</span>}
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