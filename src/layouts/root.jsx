import React from 'react';
import Sidebar from '../components/shared/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <section className='max-w-screen-2xl mx-auto w-full'>
            <Sidebar />
            <section className='flex flex-col sm:ml-64'>
                <Outlet />
            </section>
        </section>
    );
};

export default Root;