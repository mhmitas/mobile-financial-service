import React, { useState } from "react"
import { format } from "date-fns"
import toast from "react-hot-toast"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import AgentAcceptCashInRequestModal from "../../modals/AgentAcceptCashInRequestModal"
import askConfirm from "../../modals/askConfirm"

function AgentCashInRequestsTableRow({ request, index, refetch, currentUser, totalBalanceRefetch }) {
    const axiosSecure = useAxiosSecure()
    const [showSendMoneyModal, setShowSendMoneyModal] = useState(false)
    const { userName, userEmail, userNumber, amount, requestDate } = request
    const formattedDate = format(new Date(requestDate), "dd MMM yyyy'") || "not available"

    async function handleApprove() {
        try {
            const ask = await askConfirm(`Are you sure? You want to accept this cash in request from ${userName}`)
            if (!ask) {
                return
            }
            setShowSendMoneyModal(true)
        } catch (error) {
            console.error("agent accept cash in request error:", error);
        }
    }
    async function handleReject() {
        try {
            const ask = await askConfirm(`Are you sure? You want to reject this cash in request from ${userName}`)
            if (!ask) return
            const { data } = await axiosSecure.delete(`/api/agent/delete-request/${request?._id}`)
            console.log(data);
            if (data.deletedCount > 0) {
                toast("Request rejected")
            }
            refetch()
            setShowSendMoneyModal(true)
        } catch (error) {
            console.error("agent accept cash in request error:", error);
        }
    }


    return (
        <tr>
            <td>{index + 1}</td>
            <td>{userName}</td>
            <td>{userEmail}</td>
            <td>{userNumber}</td>
            <td>{amount?.toLocalString || amount} BDT</td>
            <td>{formattedDate}</td>
            <td className='flex justify-center'>
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1">Approve</div>
                    <ul tabIndex={0} className="dropdown-content menu gap-2 bg-base-200 rounded-md z-[1] w-max p-2 shadow-md">
                        <li><button onClick={handleApprove} className='btn btn-sm hover:btn-success'>Approve</button></li>
                        <li><button onClick={handleReject} className='btn btn-sm hover:btn-error'>Reject</button></li>
                    </ul>
                </div>
                {showSendMoneyModal && <AgentAcceptCashInRequestModal setShowModal={setShowSendMoneyModal} currentUser={currentUser} refetch={refetch} defaultAmount={amount} defaultNumber={userNumber} requestId={request?._id} totalBalanceRefetch={totalBalanceRefetch} />}
            </td>
        </tr>
    )
}

export default AgentCashInRequestsTableRow