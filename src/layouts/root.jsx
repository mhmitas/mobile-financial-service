import React from 'react';
import Sidebar from '../components/shared/sidebar/Sidebar';
import SimpleHeader from '../components/shared/header/SimpleHeader';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <section className='max-w-screen-2xl mx-auto w-full'>
            <Sidebar />
            <section className='flex flex-col md:ml-64'>
                <SimpleHeader />
                <div className='flex-1'>
                    <Outlet />
                </div>
            </section>
        </section>
    );
};

export default Root;