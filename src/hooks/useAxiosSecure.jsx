import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
})

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
})

const useAxiosSecure = () => {
    return null
};

export default useAxiosSecure;