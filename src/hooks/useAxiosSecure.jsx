import axios from "axios"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true
})

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    useEffect(() => {
        axiosSecure.interceptors.response.use(
            res => {
                return res
            },
            async error => {
                console.log('error tracked in the interceptor', error.response)
                if (error.response.status === 401 || error.response.status === 403) {
                    // await axiosInstance("/api/logout")
                    navigate('/login')
                }
                return Promise.reject(error)
            }
        )
    }, [])
    return axiosSecure
};

export default useAxiosSecure;