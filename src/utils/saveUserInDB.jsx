import toast from "react-hot-toast";
import { axiosInstance } from "../hooks/useAxiosSecure";

const saveUserInDB = async (user) => {
    try {
        const res = await axiosInstance.post("/api/register", user, { withCredentials: true })
        return res
    } catch (err) {
        toast.error(err?.response?.data?.message || "Something went wrong! Please try again letter")
        console.error("Mongodb user registration error:", err.response?.data?.message);
    }
};

export { saveUserInDB }