import React from 'react';
import classes from "./ToolbarButton.module.scss";
import {MdDelete} from "react-icons/md";


const DeleteButton = ({ onClick }) => {
    return (
        <button className={classes.button} onClick={onClick}>
            <MdDelete size={20} color="black" />
        </button>
    );
};

export default DeleteButton;