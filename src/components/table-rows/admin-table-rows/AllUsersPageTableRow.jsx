import React from 'react';
import { FaTrash } from "react-icons/fa";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast, { } from "react-hot-toast";

const AllUsersPageTableRow = ({ user, index, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const { name, number, status, role, email } = user

    async function handleUpdateUserRole(role) {
        try {
            const data = { role: "user", status: "verified" }
            const res = await axiosSecure.patch(`/api/admin/update-user-role/${email}`, data)
            console.log(res.data);
            if (res.data?.modifiedCount > 0) {
                toast.success(`${name}'s role updated`)
                refetch()
            }
        } catch (err) {
            console.error('user role update error:', err);
        }
    }


    return (
        <tr>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{number}</td>
            <td>{role}</td>
            <td className="text-warning">
                <span className={`badge badge-outline ${status === "pending" && "badge-warning",
                    status === "verified" && "badge-success"
                    }`}>{status}</span>
            </td>
            <td className='flex flex-wrap items-center justify-center gap-2'>
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-sm m-1">Change Status</div>
                    <ul tabIndex={0} className="dropdown-content menu rounded-lg z-[1] w-max bg-base-200 p-2 shadow">
                        {role === "pending" && <li><button onClick={handleUpdateUserRole}>Approve</button></li>}
                        {role === "user" && <li><button>Block</button></li>}
                    </ul>
                </div>
                <button className="btn btn-error btn-sm btn-ghost"><FaTrash /></button>
            </td>
        </tr>
    );
};

export default AllUsersPageTableRow;