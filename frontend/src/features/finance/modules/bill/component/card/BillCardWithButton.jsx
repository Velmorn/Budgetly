import React, {useEffect, useState} from 'react';
import classes from "./BillCardWithButton.module.scss";
import {getCurrencyByCode} from "../../../../utils/getCurrencyByCode.js";
import {useNavigate} from "react-router-dom";
import {MdDelete, MdEdit} from "react-icons/md";
import BillService from "../../../../API/BillService.js";
import DeleteModal from "../../../../components/modal/DeleteModal.jsx";
import CustomAlert from "../../../../components/UI/Alert/CustomAlert.jsx";


const BillCardWithButton = ({ bill }) => {
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [alert, setAlert] = useState(null);
    const currencyData = getCurrencyByCode(bill.currency);

        const handleDelete = async () => {
            try {
                await BillService.deleteBill(bill.id);
                setShowDeleteModal(false);
                setAlert({
                    title: "Рахунок видалено",
                    type: "success",
                    message: "Рахунок успішно видалено"
                });
            } catch (error) {
                setAlert({
                    title: "Помилка видалення рахунку",
                    type: "error",
                    message: error?.response?.data?.message || error?.message || "Сталася невідома помилка"
                });
            }
        };


    return (
        <div className={classes.card}>
            <div
                className={classes.colorStripe}
                style={{ backgroundColor: bill.color }}
            />
            <div className={classes.content}>
                <div className={classes.details}>
                    <div className={classes.name}>{bill.name}</div>
                    <div className={classes.amount}>
                        {bill.balance} {currencyData?.symbol} {bill.currency}
                    </div>
                </div>
                <div className={classes.actions}>
                    <button onClick={() =>  navigate(`/bills/edit/${bill.id}`)} title="Редагувати">
                        <MdEdit size={25}/>
                    </button>
                    <button onClick={() => setShowDeleteModal(true)} title="Видалити">
                        <MdDelete size={25} />
                    </button>
                </div>
            </div>
            {showDeleteModal && (
                <DeleteModal
                    title="Видалити рахунок"
                    objectName={bill.name}
                    message="Ця дія є незворотною. Ви впевнені, що хочете видалити цей рахунок разом з усіма транзакціями?"
                    onCancel={() => setShowDeleteModal(false)}
                    onDelete={handleDelete}
                />
            )}
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

export default BillCardWithButton;