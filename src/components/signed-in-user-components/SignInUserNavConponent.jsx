import React from 'react';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Button, IconButton, Tooltip } from '@mui/material';

const SignInUserNavComponent = () => {
    return (
        <div className="dropdown dropdown-end">
            <Tooltip title={user?.displayName || user?.email}>
                <div tabIndex={0} role="button" className='btn btn-ghost btn-circle avatar' >
                    <div className="w-9 rounded-full">
                        <img className='rounded-full' alt={user?.email} src={user?.photoURL ? user.photoURL : 'https://i.ibb.co/tY0hxsg/default-profile.jpg'} />
                    </div>
                </div>
            </Tooltip>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-lg shadow-blue-500/10 menu menu-sm dropdown-content bg-base-100 rounded-md w-48">
                <li><a>Settings</a></li>
                <div className="divider my-0"></div>
                <li><button onClick={logOutUser}><LogoutOutlinedIcon fontSize='small' /> Logout</button></li>
            </ul>
        </div>
    );
};

export default SignInUserNavComponent;