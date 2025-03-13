import { useEffect } from "react";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";

export default function Logout() {
    const auth = useAuth();
    const logout = () => api.post('/logout');
    useEffect( () => {
       logout()
       auth.logout();
       window.location.href=""
    },[])
    return (
        <></>
    )
}