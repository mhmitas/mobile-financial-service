import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../../components/common/Container';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import AuthenticationErrMessage from '../../components/common/AuthenticationErrMessage';

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
        <Container>
            <div className='my-12'>
                <h3 className='text-2xl sm:text-4xl font-semibold text-center mb-6'><Link to='/'>Ipsum</Link></h3>
                <div className='max-w-md mx-auto bg-base-100 p-4 sm:p-6 md:p-8 rounded-md shadow-lg '>
                    <h3 className='text-2xl text-center font-semibold pb-4'>Create a new account</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                        {errorMessage && <AuthenticationErrMessage text2={errorMessage} />}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input {...register('name')} type="text" placeholder="Name" className="input input-bordered" required />
                        </div>
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
                        <p className='pt-2'>Already have an account? Please <Link to={'/login'} className='link link-primary'>Log in</Link></p>
                    </form>
                </div>
            </div>
        </Container>
    );
};

export default Signup;