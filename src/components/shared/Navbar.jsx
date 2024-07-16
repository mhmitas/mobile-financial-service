import React, { useEffect, useState } from 'react';
import { navlinks } from '../Navlinks/Navlinks';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import SignInUserNavComponent from '../signed-in-user-components/SignInUserNavConponent';
import { Button } from '@mui/material';

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { user, authLoading, logOutUser } = useAuth()

    const handleScroll = () => {
        if (window.scrollY > lastScrollY) {
            // Scroll Down
            setIsVisible(false);
        } else {
            // Scroll Up
            setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div className={`fixed top-0 w-full shadow-sm transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} z-50`}>
            <div className='flex items-center justify-between w-full py-2 lg:px-6 px-4 bg-base-100 border border-base-200 min-h-16'>
                <div>
                    <Link to='/'><button className='btn btn-ghost text-2xl '>Ipsum</button></Link>
                </div>
                <div className="navbar-center flex flex-1 justify-center">
                    <ul className="px-1 flex items-center">
                        {navlinks}
                    </ul>
                </div>
                <div className='flex items-center gap-1'>
                    <div>
                        {authLoading ?
                            <span>Loading...</span> :
                            <>{user ?
                                <SignInUserNavComponent />
                                :
                                <Link className='btn' to={'/login'}>Sign In</Link>}
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;