import React from 'react';

const AdminManageTransactionsTableRow = ({ transaction, index }) => {
    return (
        <tr>
            <th>{index}</th>
            <td className='cursor-copy tooltip' data-tip="Click to copy" onClick={() => navigator.clipboard.writeText(transaction?._id)}>{transaction._id}</td>
            <td>{new Date(transaction.date).toLocaleDateString()}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.transactionType}</td>
        </tr>
    );
};

export default AdminManageTransactionsTableRow;