import React from 'react';
import queryString from "query-string";
import { useNavigate, useSearchParams } from 'react-router-dom';

const AllUsersPageTabs = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    function handleClick(params) {
        const query = queryString.stringifyUrl({
            url: '/admin/manage-users',
            query: { role: params }
        })
        navigate(query)
    }
    const currentTab = searchParams.get('role');

    return (
        <div role="tablist" className="tabs  tabs-boxed">
            <button onClick={() => handleClick('user')} role="tab" className={`tab ${currentTab === 'user' ? 'tab-active' : ''}`}>All Users</button>
            <button onClick={() => handleClick('pending')} role="tab" className={`tab ${currentTab === 'pending' ? 'tab-active' : ''}`}>Pending Requests</button>
        </div>
    );
};

export default AllUsersPageTabs;