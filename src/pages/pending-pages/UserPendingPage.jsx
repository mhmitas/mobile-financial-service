import React from 'react';
import { AuthPageTitle } from '../authentication/Login';
import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const PendingApprovalPage = () => {
    const { user } = useAuth()

    if (user.role !== "pending") {
        return <Navigate to="/" />
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4 ">
            <div className="bg-base-100 p-8 rounded-lg shadow-lg max-w-4xl text-center">
                <div className='text-2xl md:text-4xl m-4 mt-0'>
                    <AuthPageTitle />
                </div>
                <h1 className='text-warning text-lg font-semibold'>
                    <span className=''>Hi! {user?.name} </span>
                    Thank you for registering!❤️</h1>
                <h1 className="text-2xl md:text-4xl font-bold mb-2">Your Account is Under Review</h1>
                <p className="mb-6">
                    Your account is currently under review by our team. We aim to process all registrations as quickly as possible. You will receive an email notification once your account has been approved.
                </p>
                <div className="mb-6">
                    <div className="h-36 w-36 mx-auto rounded-full bg-blue-500 flex items-center justify-center">
                        <svg
                            className="w-24 h-24 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12h6m2 0a6 6 0 11-12 0 6 6 0 0112 0z"
                            />
                        </svg>
                    </div>
                </div>
                <div className="mb-6 text-left">
                    <h2 className="text-2xl font-semibold  mb-2">What to Expect</h2>
                    <p className="">
                        While you wait, feel free to explore some of the features our application will offer:
                    </p>
                    <ul className="list-disc list-inside text-left mt-4 ">
                        <li>Track your finances in real-time</li>
                        <li>Set and manage your budgets</li>
                        <li>Receive personalized financial advice</li>
                        <li>Access your account on the go</li>
                    </ul>
                </div>
                <button className="btn btn-primary w-full">Learn More About Us</button>
            </div>
            <div className="text-center mt-2">
                <p className="">
                    If you have any questions, feel free to <a href="#" className="text-blue-500 underline">contact us</a>.
                </p>
            </div>
        </div>
    );
};

export default PendingApprovalPage;
