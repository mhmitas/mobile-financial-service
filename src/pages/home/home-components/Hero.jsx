import React from 'react';

const Hero = () => {
    return (
        <div className='w-full'>
            <div className="h-[550px] flex flex-col justify-center items-center w-full bg-base-100 ">
                <h1 className="text-5xl font-bold mb-4 text-center pt-6">
                    Welcome to Our Website
                </h1>
                <p className="text-xl mb-8 text-center">
                    We provide the best solutions for your business.
                </p>
                <div className='flex gap-2'>
                    <button className='btn btn-primary'>Hello</button>
                </div>
            </div>
        </div>
    );
};

export default Hero;