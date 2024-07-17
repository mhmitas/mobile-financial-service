import { FaHistory, FaUsers, } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { BiTransfer } from 'react-icons/bi';
import { MdSupervisorAccount } from 'react-icons/md';

// import PaidIcon from '@mui/icons-material/Paid';

const userSidebarMenuItems = [
    { name: "Dashboard", path: "/user-dashboard", icon: LuLayoutDashboard },
    { name: "Transaction History", path: "/user-transaction-history", icon: FaHistory },
]

const agentSidebarMenuItems = [
    { name: "Dashboard", path: "/agent-dashboard", icon: LuLayoutDashboard },
    { name: "Transaction History", path: "/agent-transaction-history", icon: FaHistory },
]
const adminSidebarMenuItems = [
    { name: "Dashboard", path: "/admin-dashboard", icon: LuLayoutDashboard },
    { name: "Manage Users", path: "/admin/manage-users", icon: FaUsers },
    { name: "Manage Agents", path: "/admin/manage-agents", icon: MdSupervisorAccount },
    { name: "Transaction Management", path: "/admin/manage-transactions", icon: BiTransfer },
    { name: "Transaction History", path: "/admin-transaction-history", icon: FaHistory },
]



export { userSidebarMenuItems, agentSidebarMenuItems, adminSidebarMenuItems }