import React, {useRef} from 'react';
import {Outlet} from "react-router-dom";
import SideBar from "../sideBar/SideBar.jsx";
import classes from './ApplicationLayout.module.scss';

const ApplicationLayout = () => {


    return (
        <div className={classes.root}>
            <SideBar/>
            <main className={classes.container}>
                <Outlet/>
            </main>
        </div>
    );
};

export default ApplicationLayout;