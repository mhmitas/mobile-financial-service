import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../hooks/useAxiosSecure";

export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true)

    function logOutUser() {
        try {
            axiosInstance("/api/logout")
            setUser(null)
            setAuthLoading(false)
        } catch (err) {
            console.error("log out error:", err);
            setAuthLoading(false)
        }
    }

    useEffect(() => {
        axiosInstance.get("/api/current-user", { withCredentials: true }, { headers: { Authorization: "Bearer myToken" } })
            .then((res) => {
                console.log("user from...", res.data);
                setUser(res.data)
                setAuthLoading(false)
            }).catch(err => {
                console.error(err);
                setAuthLoading(false)
            })
    }, [])

    const authInfo = {
        user,
        setUser,
        authLoading,
        setAuthLoading,
        logOutUser,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;