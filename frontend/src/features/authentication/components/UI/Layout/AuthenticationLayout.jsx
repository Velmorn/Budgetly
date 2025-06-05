import React from 'react';
import classes from './AuthenticationLayout.module.scss';
import {Outlet} from "react-router-dom";
import Header from "../../../../../components/header/Header.jsx";

const AuthenticationLayout = () => {
    return (
        <div className={classes.root}>
            <Header></Header>
            <main className={classes.container}>
            <Outlet/>
            </main>
        </div>
    );
};

export default AuthenticationLayout;