import React, { useEffect } from 'react';
import SimpleHeader from '../../components/shared/header/SimpleHeader';
import queryString from 'query-string';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import AdminManageAgentsTabs from '../../components/admin-components/AdminManageAgentsTabs';
import { useQuery } from '@tanstack/react-query';
import AllAgentsTableRow from '../../components/table-rows/admin-table-rows/AllAgentsTableRow';
import CenterLoadingComponent from '../../components/common/loading-components/CenterLoadingComponent';

const AdminAgentsManagement = () => {
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const [searchParams, setSearchParams] = useSearchParams()


    useEffect(() => {
        if (!searchParams.get('role')) {
            const query = queryString.stringifyUrl({
                url: '/admin/manage-agents',
                query: { role: 'agent' }
            })
            navigate(query, { replace: true })
        }
    }, [searchParams.get('role')])

    const currentTab = searchParams.get("role")

    const { data: users = [], isPending, refetch } = useQuery({
        queryKey: ["admin-all-users", searchParams.get('role')],
        queryFn: async () => {
            if (currentTab === "agent") {
                const { data } = await axiosSecure(`/api/admin/all-users?role=${searchParams.get("role")}`)
                console.log(data);
                return data
            }
            if (currentTab === "pending-agent-requests") {
                const { data } = await axiosSecure(`/api/admin/pending-agent-requests`)
                console.log(data);
                return data
            }
        }
    })


    return (
        <div className="my-container min-h-screen">
            <SimpleHeader title={"Manage Users"} />
            <div className="">
                {/* User List Table */}
                <div className="bg-base-100 p-6 rounded-lg shadow">
                    <div className='flex flex-col md:flex-row justify-between mb-4'>
                        <h2 className="text-2xl font-semibold">Users</h2>
                        <div>
                            <AdminManageAgentsTabs />
                        </div>
                        <div>
                            <input className='input input-bordered input-sm p-4' type="text" placeholder='🔎 Search user...' />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        {isPending && <CenterLoadingComponent />}
                        <table className="table mb-28">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th className='text-center'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((user, index) => <AllAgentsTableRow user={user} index={index} key={index} refetch={refetch} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAgentsManagement;
