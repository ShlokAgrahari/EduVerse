import React from "react";
import { useState,useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";



const PrivateRoute = () => {
    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        
        const token = Cookies.get("token");
        console.log(token);

        if (token) {
            setIsLogged(true);
        } else {
            navigate("/login");
        }
    }, [navigate]);

    return isLogged ? <Outlet /> : null;
};

export default PrivateRoute;


