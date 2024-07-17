import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrash } from 'react-icons/fa';
import askConfirm from '../../modals/askConfirm';
import toast from 'react-hot-toast';

const AllAgentsTableRow = ({ user, index, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const { name, number, status, role, email } = user

    async function handleMakeAgent() {
        try {
            const ask = await askConfirm(
                <span>Do you want to approve {name}'s request?</span>,
                <span>10 thousand Taka will be deposited in the user's account as a bonus</span>
            )
            if (!ask) return;
            const res = await axiosSecure.patch(`/api/admin/make-agent/${email}`, { bonusAmount: 10000 })
            console.log(res.data);
            if (res.data?.result?.modifiedCount > 0) {
                toast.success(name, "has come agent")
            }
            refetch()
        } catch (err) {
            console.error(err);
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
                    <div tabIndex={0} role="button" className="btn btn-sm m-1">Change Role</div>
                    <ul tabIndex={0} className="dropdown-content menu rounded-lg z-[1] w-max bg-base-200 p-2 shadow">
                        {user?.wantToBecomeAgent && <li><button onClick={handleMakeAgent}>Make Agent</button></li>}
                        {role === "user" && <li><button>Block</button></li>}
                    </ul>
                </div>
                <button className="btn btn-error btn-sm btn-ghost"><FaTrash /></button>
            </td>
        </tr>
    );
};

export default AllAgentsTableRow;