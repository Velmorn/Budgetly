import React, {useEffect, useState} from 'react';
import BillService from "../../../../API/BillService.js";
import classes from "./TransferModal.module.scss";
import {useParams} from "react-router-dom";
import Loader from "../../../../../../components/loader/Loader.jsx";
import CustomAlert from "../../../../components/UI/Alert/CustomAlert.jsx";

const TransferModal = ({ onClose, onTransferred }) => {
    const { id } = useParams();
    const [bills, setBills] = useState([]);
    const [bill, setBill] = useState(null);
    const [toBillId, setToBillId] = useState(null);
    const [amount, setAmount] = useState("");
    const [alert, setAlert] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const billsData = await BillService.getAll();
                const allBills = billsData;
                setBills(allBills.filter(b => b.id !== Number(id)));
                const firstAvailable = allBills.find(b => b.id !== Number(id));
                if (firstAvailable) setToBillId(firstAvailable.id);

                const fromBillData = await BillService.getById(id);
                setBill(fromBillData);
            } catch (error) {
                console.error("Помилка при завантаженні рахунків:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBills();
    }, [id]);

    const handleTransfer = async () => {
        if (!toBillId || !id || !amount || amount <= 0) return;

        try {
            await BillService.transfer({
                fromBillId: Number(id),
                toBillId,
                amount: parseFloat(amount),
            });
            if (onTransferred) onTransferred();
            onClose();
            setAlert({
                title: "Переказ здійснено",
                type: "success",
                message: "Переказ успішно здійснено"
            });
        } catch (error) {
            setAlert({
                title: "Помилка переказу",
                type: "error",
                message: error?.response?.data?.message || error?.message || "Сталася невідома помилка"
            });
        }
    };

    const fromBill = bills.find(b => b.id === Number(id));

    if(isLoading){
        return(<Loader/>)
    }

    return (
        <div className={classes.backdrop} onClick={onClose}>
            <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
                <div className={classes.modalHeader}>
                    <h2 className={classes.title}>Переказ коштів</h2>
                    <button className={classes.closeBtn} onClick={onClose}>×</button>
                </div>

                <div className={classes.transferRow}>
                    <span className={classes.billLabel}>
                        {bill.name}
                    </span>
                    <span className={classes.arrow}>→</span>
                    <select
                        className={classes.select}
                        value={toBillId || ""}
                        onChange={(e) => setToBillId(Number(e.target.value))}
                    >
                        {bills.map(bill => (
                            <option key={bill.id} value={bill.id}>
                                {bill.name}
                            </option>
                        ))}
                    </select>
                </div>

                <input
                    className={classes.inputAmount}
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Сума переказу"
                    step="0.01"
                    min="0"
                />

                <button
                    className={classes.transferBtn}
                    onClick={handleTransfer}
                    style={{backgroundColor: bill.color}}
                    disabled={!toBillId || !amount || amount <= 0}
                >
                    Переказати
                </button>
            </div>
            {alert && (
                <CustomAlert
                    title={alert.title}
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
        </div>
    );
};

export default TransferModal;

