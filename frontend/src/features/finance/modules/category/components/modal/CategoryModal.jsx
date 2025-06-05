import React from 'react';
import CategoryCard from "../card/CategoryCard.jsx";
import styles from "./CategoryModal.module.scss";

const CategoryModal = ({ categories, isOpen, onClose, onSelect }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <h3>Виберіть категорію</h3>
                    <button onClick={onClose} className={styles.closeBtn}>×</button>
                </div>
                <div className={styles.grid}>
                    {categories.map(category => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            onSelect={(cat) => {
                                onSelect(cat);
                                onClose();
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;