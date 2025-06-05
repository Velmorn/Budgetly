import React from 'react';
import { Plus } from "lucide-react";
import classes from "./ToolbarButton.module.scss";


const CreateButton = ({ onClick }) => {
    return (

            <button className={classes.button} onClick={onClick}>
                <Plus size={20} />
            </button>
    );
};


export default CreateButton;