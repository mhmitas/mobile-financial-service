import { FaHistory, } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";

// import PaidIcon from '@mui/icons-material/Paid';

const userSidebarMenuItems = [
    { name: "Dashboard", path: "/user-dashboard", icon: LuLayoutDashboard },
    { name: "Transaction History", path: "/user-transaction-history", icon: FaHistory },
    { name: "Transaction History", path: "/user-transaction-history", icon: FaHistory },
    { name: "Transaction History", path: "/user-transaction-history", icon: FaHistory },
]

const agentSidebarMenuItems = [
    { name: "Dashboard", path: "/agent-home", icon: LuLayoutDashboard },
    { name: "Transaction History", path: "/agent-transaction-history", icon: FaHistory },
    { name: "Transaction History", path: "/agent-transaction-history", icon: FaHistory },
    { name: "Transaction History", path: "/agent-transaction-history", icon: FaHistory },
]
const adminSidebarMenuItems = [
    { name: "Dashboard", path: "/admin-home", icon: LuLayoutDashboard },
    { name: "Transaction History", path: "/admin-transaction-history", icon: FaHistory },
    { name: "Transaction History", path: "/admin-transaction-history", icon: FaHistory },
    { name: "Transaction History", path: "/admin-transaction-history", icon: FaHistory },
]



export { userSidebarMenuItems, agentSidebarMenuItems, adminSidebarMenuItems }