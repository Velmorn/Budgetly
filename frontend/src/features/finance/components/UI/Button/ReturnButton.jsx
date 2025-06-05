import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import classes from './ToolbarButton.module.scss';
import {useNavigate} from "react-router-dom";

const ReturnButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1);
    };

    return (
        <button className={classes.button} onClick={handleClick}>
            <MdArrowBack size={20} color="black" />
        </button>
    );
};

export default ReturnButton;