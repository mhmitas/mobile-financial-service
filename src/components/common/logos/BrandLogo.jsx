import React from 'react';
import { Link } from "react-router-dom";

const BrandLogo = () => {
    return (
        <Link to="/" className='font-bold bg-gradient-to-r from-rose-600 via-blue-700 to-blue-600 text-white px-[12px] py-[6px] rounded-md'>MhFins</Link>
    );
};

export default BrandLogo;