import React from 'react';
import classes from './ToolbarButton.module.scss';
import {MdEdit} from "react-icons/md";

const EditButton = ({onClick}) => {
    return (
        <button className={classes.button} onClick={onClick}>
            <MdEdit size={20} color="black" />
        </button>
    );
};

export default EditButton;