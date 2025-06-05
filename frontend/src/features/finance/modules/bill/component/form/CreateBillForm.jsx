import React, {useState} from 'react';
import BillService from "../../../../API/BillService.js";
import './CreateBillForm.module.scss';
import CurrencyCardList from "../../../../components/cards/CurrencyCardList.jsx";
import ColorCarousel from "../../../../components/UI/Input/ColorCarousel.jsx";
import classes from "./CreateBillForm.module.scss";
import FormButton from "../../../../components/UI/Button/FormButton.jsx";
import {useNavigate} from "react-router-dom";
import CustomAlert from "../../../../components/UI/Alert/CustomAlert.jsx";

const CreateBillForm = () => {
    const navigate = useNavigate();
    const [bill, setBill] = useState({ name: "",  color: "", currency: "", balance: 0 });
    const [alert, setAlert] = useState(null);


    const createBill = async (e) => {
        e.preventDefault();
        try {
            await BillService.createBill(bill);
            setBill({ name: "",  color: "", currency: "", balance: 0 });
            setAlert({
                title: "Рахунок створено",
                type: "success",
                message: "Рахунок успішно створено"
            });
            setTimeout(() => { navigate(-1);}, 1000);
        } catch (error) {
            setAlert({
                title: "Помилка створення рахунку",
                type: "error",
                message: error?.response?.data?.message || error?.message || "Сталася невідома помилка"
            });
        }
    };

    const handleColorSelect = (color) => {
        setBill((prev) => ({
            ...prev,
            color,
        }));
    };

    return (
        <form className={classes.form} onSubmit={createBill}>
            <input
                className={classes.inputName}
                value={bill.name}
                onChange={(e) => setBill({ ...bill, name: e.target.value })}
                type="text"
                placeholder="Назва"
                required
            />

            <ColorCarousel selectedColor={bill.color} onColorSelect={handleColorSelect} />

            <div className={classes.balanceRow}>
                <label className={classes.label}>Почати з</label>
                <input
                    className={classes.inputBalance}
                    value={bill.balance}
                    onChange={(e) => setBill({ ...bill, balance: Number(e.target.value) })}
                    type="number"
                    placeholder="0.00"
                    required
                />
            </div>


            <CurrencyCardList
                selectedCurrency={bill.currency}
                onSelect={(code) => setBill({ ...bill, currency: code })}
            />

            <FormButton type="submit"  disabled={!bill.name || !bill.currency || !bill.color} >
                Створити рахунок
            </FormButton>

            {alert && (
                <CustomAlert
                    title={alert.title}
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
        </form>
    );
};

export default CreateBillForm;

