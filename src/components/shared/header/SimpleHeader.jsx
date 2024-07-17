import React from 'react';
import useAuth from '../../../hooks/useAuth';

const SimpleHeader = () => {
    const { user } = useAuth()

    return (
        <section className='my-container py-6'>
            <h3 className='text-3xl font-semibold mb-2'>Welcome, <span className='text-primary'>{user?.name}</span></h3>
            <p className='text-lg'>Access & manage your account and transactions efficiently.</p>
        </section>
    );
};

export default SimpleHeader;