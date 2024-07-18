import React, { useEffect, useState } from 'react';
import SimpleHeader from '../../components/shared/header/SimpleHeader';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import AllUsersPageTabs from '../../components/admin-components/AllUsersPageTabs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import queryString from 'query-string';
import CenterLoadingComponent from '../../components/common/loading-components/CenterLoadingComponent';
import AllUsersPageTableRow from '../../components/table-rows/admin-table-rows/AllUsersPageTableRow';
import { FaSearch } from 'react-icons/fa';

const AdminUserManagement = () => {
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const [searchTexts, setSearchText] = useState("")
    const [searchParams, setSearchParams] = useSearchParams()


    useEffect(() => {
        if (!searchParams.get('role')) {
            const query = queryString.stringifyUrl({
                url: '/admin/manage-users',
                query: { role: 'user' }
            })
            navigate(query, { replace: true })
        }
    }, [searchParams.get('role')])


    const { data: users = [], isPending, refetch } = useQuery({
        queryKey: ["admin-all-users", searchParams.get('role'), searchTexts],
        queryFn: async () => {
            const { data } = await axiosSecure(`/api/admin/all-users?role=${searchParams.get("role")}&searchText=${searchTexts}`)
            console.log(data);
            return data
        }
    })


    async function handleSearch(e) {
        e.preventDefault()
        setSearchText(e.target.search.value)
        // console.log(e.target.search.value);
        refetch()
    }

    return (
        <div className="my-container min-h-screen">
            <SimpleHeader title={"Manage Users"} />
            <div className="">
                {/* User List Table */}
                <div className="bg-base-100 p-6 rounded-lg shadow">
                    <div className='flex flex-col md:flex-row justify-between mb-4'>
                        <h2 className="text-2xl font-semibold">Users</h2>
                        <div>
                            <AllUsersPageTabs />
                        </div>
                        <form onSubmit={handleSearch} className='flex gap-2'>
                            <input onChange={e => e.target.value.length === 0 && setSearchText('')} className='input input-bordered input-sm p-4' type="text" placeholder='🔎 Search user...' name='search' />
                            <button className='btn btn-sm btn-primary'><FaSearch /></button>
                        </form>
                    </div>
                    <div className="overflow-x-auto relative">
                        {isPending && <CenterLoadingComponent />}
                        <table className="table mb-16">
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
                                {
                                    users.map((user, index) => <AllUsersPageTableRow user={user} key={index} index={index} refetch={refetch} />)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUserManagement;
