import React from 'react';
import queryString from "query-string";
import { useNavigate, useSearchParams } from 'react-router-dom';

const AdminManageAgentsTabs = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    function handleClick(params) {
        const query = queryString.stringifyUrl({
            url: '/admin/manage-agents',
            query: { role: params }
        })
        navigate(query)
    }
    const currentTab = searchParams.get('role');

    return (
        <div role="tablist" className="tabs  tabs-boxed">
            <button onClick={() => handleClick('agent')} role="tab" className={`tab ${currentTab === 'agent' ? 'tab-active' : ''}`}>All Agents</button>
            <button onClick={() => handleClick('pending-agent-requests')} role="tab" className={`tab ${currentTab === 'pending-agent-requests' ? 'tab-active' : ''}`}>Pending Agent Requests</button>
        </div>
    );
};

export default AdminManageAgentsTabs;