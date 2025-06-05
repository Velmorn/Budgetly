import React, {createContext, useContext, useEffect, useState} from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import axios from "axios";
import Loader from "../../../components/loader/Loader.jsx";


const AuthenticationContext = createContext(null);

export function useAuthentication() {
    return useContext(AuthenticationContext);
}

const AuthenticationContextProvider = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    const isOnAuthPage =
        location.pathname === "/authentication/login" ||
        location.pathname === "/authentication/sign-up" ||
        location.pathname === "/authentication/request-password-reset";

    const login = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:8080/api/authentication/login", {
                email,
                password,
            });
            const token = response.data.token;
            localStorage.setItem("token", token);
        } catch (error) {
            const message = error.response?.data?.message || "Login failed";
            throw new Error(message);
        }
    };

    const signup = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:8080/api/authentication/register", {
                email,
                password,
            });
            const token = response.data.token;
            localStorage.setItem("token", token);
        } catch (error) {
            const message = error.response?.data?.message || "Registration failed";
            throw new Error(message);
        }
    };

    const logout = async () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://localhost:8080/api/authentication/user",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const user = response.data;
            setUser(user);
            console.log(user);
        } catch (e) {
            console.error("Authentication failed:", e.response?.data || e.message);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        if (user) {
            return;
        }
        fetchUser();
    }, [user, location.pathname]);

    if (isLoading) {
        return <Loader/>;
    }

    if (!isLoading && !user && !isOnAuthPage) {
        return <Navigate to="/authentication/login"/>;
    }

    if (user && !user.emailVerified && location.pathname !== "/authentication/verify-email") {
        return <Navigate to="/authentication/verify-email"/>;
    }

    if (
        user &&
        user.emailVerified &&
        !user.dataComplete &&
        !location.pathname.includes("/authentication/user-data")
    ){
        return <Navigate to={'/authentication/user-data/${user.id}'}/>;
    }

    if (
        user &&
        user.emailVerified &&
        user.dataComplete &&
        location.pathname.includes("/authentication/user-data")
    ) {
        return <Navigate to="/" />;
    }

    if (user && isOnAuthPage) {
        return <Navigate to={location.state?.from || "/"} />;
    }


    return (

        <AuthenticationContext.Provider value={{user, login, signup, logout, setUser}}>
            <Outlet/>
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationContextProvider;