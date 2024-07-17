import React from 'react';
import queryString from "query-string";
import { useNavigate, useSearchParams } from 'react-router-dom';

const AgentDashboardPageTabs = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    function handleClick(params) {
        const query = queryString.stringifyUrl({
            url: '/agent-dashboard',
            query: { show: params }
        })
        navigate(query)
    }
    const currentTab = searchParams.get('show');

    return (
        <div role="tablist" className="tabs tabs-boxed">
            <button onClick={() => handleClick('cash-in-requests')} role="tab" className={`tab ${currentTab === 'cash-in-requests' ? 'tab-active' : ''}`}>Cash In Requests</button>
            <button onClick={() => handleClick('cash-out-requests')} role="tab" className={`tab ${currentTab === 'cash-out-requests' ? 'tab-active' : ''}`}>Cash Out Requests</button>
        </div>
    );
};

export default AgentDashboardPageTabs;