import React from 'react';
import SimpleHeader from '../../components/shared/header/SimpleHeader';

const UserDashboard = () => {
    return (
        <section className='my-container'>
            <SimpleHeader subtitle={"Access & manage your account and transactions efficiently."} />
            User Dashboard
        </section>
    );
};

export default UserDashboard;