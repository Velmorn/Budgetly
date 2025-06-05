import React from 'react';
import classes from './ToolbarButton.module.scss';
import { FaClockRotateLeft } from "react-icons/fa6";

const HistoryButton = ({onClick}) => {
    return (
        <button className={classes.button} onClick={onClick}>
            <FaClockRotateLeft size={16} color="black" />
        </button>
    );
};

export default HistoryButton;