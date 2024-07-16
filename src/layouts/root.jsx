import React from 'react';
import Navbar from '../components/shared/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/shared/footer/Footer';


const Root = () => {
    return (
        <div className='min-h-screen flex flex-col justify-between relative'>
            <Navbar />
            <div className='max-w-screen-2xl mx-auto w-full'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;