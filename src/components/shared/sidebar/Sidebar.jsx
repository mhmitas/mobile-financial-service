import React from 'react';
import { NavLink } from 'react-router-dom';
import { userSidebarMenuItems } from './menu-items/menuItems';
import { AuthPageTitle } from '../../../pages/authentication/Login';

const Sidebar = () => {
    return (
        <aside className={`fixed w-64 inset-y-0 left-0 bg-base-100 border-r`}>
            <SidebarHeader />
            <div className='divider mt-0 mb-2'></div>
            <ul className='menu md:text-lg gap-2'>
                {userSidebarMenuItems.map((item, index) => <SidebarMenuItem name={item.name} path={item.path} Icon={item.icon} key={index} />)}
            </ul>
        </aside>
    );
};

export default Sidebar;


function SidebarMenuItem({ name, path, Icon }) {
    return (
        <li>
            <NavLink className='flex gap-1 items-center' to={path}><Icon size={23} /> <span>{name}</span></NavLink>
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