import React from 'react';
import classes from './ToolbarButton.module.scss';
import { FaFilter } from "react-icons/fa";

const FilterButton = ({onClick}) => {
    return (
        <button className={classes.button} onClick={onClick}>
            <FaFilter size={16} color="black" />
        </button>
    );
};

export default FilterButton;