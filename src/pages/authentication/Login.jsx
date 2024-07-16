import React, { useState } from 'react';
import Container from '../../components/common/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import AuthenticationErrMessage from '../../components/common/AuthenticationErrMessage';

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
        <Container>
            <div className='my-12 border-base-200'>
                <h3 className='text-2xl sm:text-4xl font-semibold text-center mb-6'><Link to='/'>Ipsum</Link></h3>
                <div className='max-w-md mx-auto bg-base-100 p-4 sm:p-6 md:p-8 rounded-md shadow-lg '>
                    <h3 className='text-2xl text-center font-semibold pb-4'>Log in to Ipsum</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                        {errorMessage && <AuthenticationErrMessage />}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register('email')} type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register('password')} type="text" placeholder="Password" className="input input-bordered" required />
                        </div>
                        <div className="flex items-center justify-center pt-3">
                            <button disabled={processing} className='w-full btn btn-primary text-lg' type='submit' >
                                {processing ?
                                    <span className='loading loading-spinner text-primary'></span> :
                                    'Log in'
                                }
                            </button>
                        </div>
                        <p className='pt-2'>Don't have an account? Please <Link to={'/sign-up'} className='link link-primary'>Sign up</Link></p>
                    </form>
                </div>
            </div>
        </Container>
    );
};

export default Login;

// shadow-blue-500/15 hover:shadow-blue-500/25 duration-300 transition