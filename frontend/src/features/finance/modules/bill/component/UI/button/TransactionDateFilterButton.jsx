import { useState } from "react";
import TransactionDateFilterModal from "../../modal/TransactionDateFilterModal.jsx";
import classes from "./TransactionDateFilterButton.module.scss";


const TransactionDateFilterButton = ({ onFilterChange, color }) => {
    const [showModal, setShowModal] = useState(false);
    const [label, setLabel] = useState("Весь час");

    const handleApply = (filterFn, labelText) => {
        setLabel(labelText);
        onFilterChange(() => filterFn);
        setShowModal(false);
    };

    return (
        <div className={classes.wrapper}>
            <button
                className={classes.button}
                onClick={() => setShowModal(true)}
                style={{ backgroundColor: color }}
            >
                {label}
            </button>
            {showModal && (
                <TransactionDateFilterModal
                    onClose={() => setShowModal(false)}
                    onApply={handleApply}
                />
            )}
        </div>
    );
};

export default TransactionDateFilterButton;