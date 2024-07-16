import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../../components/common/Container';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import AuthenticationErrMessage from '../../components/common/AuthenticationErrMessage';
import { AuthPageTitle } from './Login';

const Signup = () => {
    const navigate = useNavigate()
    const [processing, setProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()
    const { createUser, setAuthLoading, updateUserProfile } = useAuth()

    const onSubmit = async (data) => {
        setProcessing(true)
        try {
            const { user } = await createUser(data.email, data.password)
            console.log(user);
            await updateUserProfile(data?.name)
            toast.success('Sign Up Success')
            reset()
            navigate('/')
            setProcessing(false)
        } catch (err) {
            console.error(err);
            setErrorMessage(err.message?.slice(10))
            setProcessing(false)
            setAuthLoading(false)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen mt-10 mb-16">
            <div className="card max-w-md w-full">
                <h1 className='text-3xl mb-10 text-center'><AuthPageTitle /></h1>
                <div className="card-body shadow-lg rounded-md border">
                    <h2 className="text-lg font-semibold text-center">Create a new account.</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label" htmlFor="name">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                {...register('fullName')} required
                                className={`input input-bordered`}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="username">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                id="username"
                                {...register('userName')} required
                                className={`input input-bordered`}
                            />
                            {errors.username && <span className="text-error">{errors.username.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="email">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register('email')} required
                                className={`input input-bordered`}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="password">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                {...register('password')} required
                                className={`input input-bordered`}
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary text-lg">Sign Up</button>
                        </div>
                    </form>
                    <p className='my-1'>Already have an account? Please <Link to="/login" className='link link-primary'>Log in</Link> </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;