import React from 'react';
import useAuth from '../../../hooks/useAuth';

const SimpleHeader = ({ title, subtitle }) => {
    const { user } = useAuth()

    return (
        <section className='py-4'>
            {title ?
                <h3 className='text-3xl font-semibold mb-2'>{title}</h3>
                :
                <h3 className='text-3xl font-semibold mb-2'>Welcome, <span className='text-primary'>{user?.name}</span></h3>
            }
            {subtitle &&
                <p className='text-lg'>{subtitle}</p>
            }
        </section>
    );
};

export default SimpleHeader;