import React from 'react';
import styles from "./CategoryCard.module.scss"

const CategoryCard = ({ category, onSelect }) => {
    return (
        <div className={styles.wrapper} onClick={() => onSelect(category)}>
            <div
                className={styles.iconBox}
                style={{ backgroundColor: category.color }}
            >
                <img src={category.iconUrl} alt={category.name} className={styles.icon} />
            </div>
            <p className={styles.name}>{category.name}</p>
        </div>
    );
};

export default CategoryCard;