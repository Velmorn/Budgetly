import React, {useState} from 'react';
import classes from "./CreateBillForm.module.scss";
import ColorCarousel from "../../../../components/UI/Input/ColorCarousel.jsx";
import CurrencyCardList from "../../../../components/cards/CurrencyCardList.jsx";
import FormButton from "../../../../components/UI/Button/FormButton.jsx";
import {useNavigate, useParams} from "react-router-dom";
import BillService from "../../../../API/BillService.js";
import CustomAlert from "../../../../components/UI/Alert/CustomAlert.jsx";

const EditBillForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [alert, setAlert] = useState(null);
    const [bill, setBill] = useState({ name: null,  color: null, currency: null });

    const updateBill = async (e) => {
        e.preventDefault();
        try {
            await BillService.updateBill(id, bill);
            setBill({ name: null,  color: null, currency: null});
            setAlert({
                title: "Рахунок оновлено",
                type: "success",
                message: "Рахунок успішно оновлено"
            });
            setTimeout(() => { navigate(-1);}, 1000);
        } catch (error) {
            setAlert({
                title: "Помилка оновлення рахунку",
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
        <form className={classes.form} onSubmit={updateBill}>
            <input
                className={classes.inputName}
                value={bill.name}
                onChange={(e) => setBill({ ...bill, name: e.target.value })}
                type="text"
                placeholder="Назва"
            />

            <ColorCarousel selectedColor={bill.color} onColorSelect={handleColorSelect} />

            <CurrencyCardList
                selectedCurrency={bill.currency}
                onSelect={(code) => setBill({ ...bill, currency: code })}
            />

            <FormButton type="submit"  disabled={!bill.name && !bill.currency && !bill.color} >
                Відредагувати рахунок
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

export default EditBillForm;