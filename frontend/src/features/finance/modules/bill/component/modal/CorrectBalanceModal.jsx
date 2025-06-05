import React, { useState, useEffect } from "react";
import classes from "./CorrectBalanceModal.module.scss";
import BillService from "../../../../API/BillService.js";

const CorrectBalanceModal = ({ bill, onClose, onUpdated }) => {
    const [newBalance, setNewBalance] = useState(bill.balance);
    const [difference, setDifference] = useState(0);

    useEffect(() => {
        setDifference(newBalance - bill.balance);
    }, [newBalance, bill.balance]);

    const handleUpdate = async () => {
        try {
            await BillService.updateBill(bill.id, { balance: newBalance });
            if (onUpdated) onUpdated();
            onClose();
        } catch (error) {
            console.error("Failed to update balance", error);
        }
    };

    const isPositive = difference >= 0;

    return (
        <div className={classes.correctModalBackdrop} onClick={onClose}>
            <div className={classes.correctModal} onClick={(e) => e.stopPropagation()}>
                <div className={classes.modalHeader}>
                    <h2 className={classes.title}>Відкорегувати баланс</h2>
                    <button className={classes.closeBtn} onClick={onClose}>×</button>
                </div>

                <div className={classes.billName}>{bill.name}</div>

                <div className={classes.balanceRow}>
                    <span className={classes.currentBalance}>{bill.balance.toFixed(2)}</span>
                    <span className={classes.arrow}>→</span>
                    <input
                        className={classes.inputNewBalance}
                        type="number"
                        value={newBalance}
                        onChange={(e) => setNewBalance(Number(e.target.value))}
                        step="0.01"
                        min="0"
                    />
                </div>

                <div className={`${classes.diffRow} ${isPositive ? classes.diffPositive : classes.diffNegative}`}>
                    <span className={classes.diffArrow}>{isPositive ? "▲" : "▼"}</span>
                    {Math.abs(difference).toFixed(2)}
                </div>

                <button
                    className={classes.updateBtn}
                    onClick={handleUpdate}
                    style={{ backgroundColor: bill.color }}
                >
                    Оновити загальний баланс
                </button>
            </div>
        </div>
    );
};

export default CorrectBalanceModal;

