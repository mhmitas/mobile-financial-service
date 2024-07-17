import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className='absolute top-1/2 left-1/2'>
            <span className='loading loading-spinner loading-lg text-secondary'></span>
        </div>
    );
};

export default LoadingSpinner;