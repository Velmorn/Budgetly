import React, {useState} from 'react';
import BudgetService from "../../../../API/BudgetService.js";
import FormButton from "../../../../components/UI/Button/FormButton.jsx";
import ColorCarousel from "../../../../components/UI/Input/ColorCarousel.jsx";
import {calculateEndDate} from "../../../../utils/calculateEndDate.js";
import classes from "./BudgetForm.module.scss";
import {useNavigate, useParams} from "react-router-dom";
import CustomAlert from "../../../../components/UI/Alert/CustomAlert.jsx";
import {periodOptions} from "../../../../constants/budgetPeriodOptions.js";


const EditBudgetForm = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);
    const [budget, setBudget] = useState({
        name: null,
        period: null,
        periodCount: null,
        budgetLimit: null,
        startDate: null,
        color: null
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setBudget((prev) => ({
            ...prev,
            [name]: name === 'periodCount' ? parseInt(value) || 1 : value
        }));
    };

    const handleColorSelect = (color) => {
        setBudget((prev) => ({
            ...prev,
            color
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const endDate = calculateEndDate(budget.startDate, budget.period, budget.periodCount);

            const payload = {
                name: budget.name,
                period: budget.period,
                periodCount: budget.periodCount,
                budgetLimit: parseFloat(budget.budgetLimit),
                startDate: new Date(budget.startDate),
                endDate: endDate,
                color: budget.color
            };

            const response = await BudgetService.updateBudget(id, payload);
            setAlert({
                title: "Бюджет оновлено",
                type: "success",
                message: "Бюджет успішно оновлено"
            });
            setTimeout(() => { navigate(-1);}, 1000);
        } catch (error) {
            setAlert({
                title: "Помилка оновлення бюджету",
                type: "error",
                message: error?.response?.data?.message || error?.message || "Сталася невідома помилка"
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <div>
                <input
                    className={classes.inputName}
                    type="text"
                    name="name"
                    value={budget.name}
                    onChange={handleChange}
                    placeholder="Назва"
                />
            </div>

            <ColorCarousel selectedColor={budget.color} onColorSelect={handleColorSelect}/>

            <div className={classes.sumWrapper}>
                <input
                    className={classes.inputSum}
                    style={{width: "100%"}}
                    type="number"
                    name="budgetLimit"
                    value={budget.budgetLimit}
                    onChange={handleChange}
                    step="0.01"
                />
            </div>


            <FormButton
                type="submit"
                disabled={!budget.name && !budget.color && !budget.budgetLimit}
            >
                Оновити бюджет
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

export default EditBudgetForm;