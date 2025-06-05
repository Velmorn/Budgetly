import { useState } from "react";
import classes from "./TransactionDateFilterModal.module.scss";

const TransactionDateFilterModal = ({ onClose, onApply }) => {
    const [type, setType] = useState("all");
    const [days, setDays] = useState(7);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const handleApply = () => {
        let filterFn;
        let labelText;

        const now = new Date();

        if (type === "all") {
            filterFn = () => true;
            labelText = "Весь час";
        } else if (type === "lastDays") {
            const startDate = new Date();
            startDate.setDate(now.getDate() - days);
            filterFn = tx => new Date(tx.date) >= startDate;
            labelText = `Останні ${days} днів`;
        } else if (type === "range") {
            const from = new Date(fromDate);
            const to = new Date(toDate);
            filterFn = tx => {
                const date = new Date(tx.date);
                return date >= from && date <= to;
            };
            labelText = `Період: ${fromDate} - ${toDate}`;
        }

        onApply(filterFn, labelText);
    };

    return (
        <div className={classes.modal}>
            <h3>Виберіть період</h3>
            <div>
                <label>
                    <input type="radio" value="all" checked={type === "all"} onChange={() => setType("all")} />
                    Весь час
                </label>
                <label>
                    <input type="radio" value="lastDays" checked={type === "lastDays"} onChange={() => setType("lastDays")} />
                    Останні днів
                </label>
                {type === "lastDays" && (
                    <input type="number" value={days} onChange={(e) => setDays(+e.target.value)} />
                )}
                <label>
                    <input type="radio" value="range" checked={type === "range"} onChange={() => setType("range")} />
                    Проміжок
                </label>
                {type === "range" && (
                    <>
                        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                    </>
                )}
            </div>
            <div className={classes.buttons}>
                <button onClick={onClose}>Скасувати</button>
                <button onClick={handleApply}>Застосувати</button>
            </div>
        </div>
    );
};

export default TransactionDateFilterModal;