import React from 'react';
import styles from './ColorCircle.module.scss'

const ColorCircle = ({ color, selected, onClick }) => {
    return (
        <div
            className={`${styles.circle} ${selected ? styles.selected : ''}`}
            style={{ backgroundColor: color }}
            onClick={onClick}
        />
    );
};


export default ColorCircle;