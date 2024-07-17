import React from 'react';
import { NavLink } from 'react-router-dom';
import { userSidebarMenuItems } from './menu-items/menuItems';
import { AuthPageTitle } from '../../../pages/authentication/Login';
import { FaSignOutAlt } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';

const Sidebar = () => {
    const { logOutUser } = useAuth()

    return (
        <div
            className={`fixed bg-base-100 duration-200 md:translate-x-0 overflow-y-auto z-20 h-screen w-64 border-r`}
        >
            <div className='flex flex-col justify-between h-full'>
                <div>
                    <SidebarHeader />
                    <div className='divider mt-0 mb-2'></div>
                    <ul className='menu sm:text-lg gap-2'>
                        {userSidebarMenuItems.map((item, index) => <SidebarMenuItem name={item.name} path={item.path} Icon={item.icon} key={index} />)}
                    </ul>
                </div>
                <ul className='menu sm:text-lg gap-2 mb-2'>
                    <li>
                        <button
                            onClick={logOutUser}
                            className='flex items-center'>
                            <FaSignOutAlt size={20} />
                            <span className='pb-[2px]'>Log Out</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;


function SidebarMenuItem({ name, path, Icon }) {
    return (
        <li>
            <NavLink className='flex gap-2 items-center' to={path}><Icon size={23} /> <span>{name}</span></NavLink>
        </li>
    )
}


function SidebarHeader() {
    return (
        <div className='p-4 flex flex-col gap-2'>
            <h1 className='text-3xl font-bold pt-3 pb-1 px-2'>
                <AuthPageTitle />
            </h1>
            {/* <form>
                <input className="input input-bordered input-sm p-5 w-full text-lg" placeholder='Search 🔎' type="text" />
            </form> */}
        </div>
    )
}