import React, {useState} from 'react';
import BudgetService from "../../../../API/BudgetService.js";
import FormButton from "../../../../components/UI/Button/FormButton.jsx";
import ColorCarousel from "../../../../components/UI/Input/ColorCarousel.jsx";
import {calculateEndDate} from "../../../../utils/calculateEndDate.js";
import classes from "./BudgetForm.module.scss";
import {useNavigate} from "react-router-dom";
import CustomAlert from "../../../../components/UI/Alert/CustomAlert.jsx";
import {periodOptions} from "../../../../constants/budgetPeriodOptions.js";


const CreateBudgetForm = () => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);
    const [budget, setBudget] = useState({
        name: '',
        period: 'MONTHLY',
        periodCount: 1,
        budgetLimit: '',
        startDate: '',
        color: ''
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

            const response = await BudgetService.createBudget(payload);
            setAlert({
                title: "Бюджет створено",
                type: "success",
                message: "Бюджет успішно створено"
            });
            setTimeout(() => { navigate(-1);}, 1000);
        } catch (error) {
            setAlert({
                title: "Помилка створення бюджету",
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
                    required
                />
            </div>

            <ColorCarousel selectedColor={budget.color} onColorSelect={handleColorSelect}/>

            <div className={classes.sumWrapper}>
                <input
                    className={classes.inputSum}
                    type="number"
                    name="budgetLimit"
                    value={budget.budgetLimit}
                    onChange={handleChange}
                    required
                    step="0.01"
                />
                <strong style={{fontSize: '24px'}}> / </strong>
                <input
                    className={classes.inputCount}
                    type="number"
                    name="periodCount"
                    value={budget.periodCount}
                    onChange={handleChange}
                    required
                    min="1"
                />

                <select
                    name="period"
                    value={budget.period}
                    onChange={handleChange}
                    className={classes.select}
                    required
                >
                    {periodOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <input
                    type="date"
                    name="startDate"
                    value={budget.startDate}
                    onChange={handleChange}
                    className={classes.inputDate}
                    required
                />
            </div>


            <FormButton
                type="submit"
                disabled={!budget.name || !budget.budgetLimit || !budget.color || !budget.startDate}>
                Створити бюджет
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

export default CreateBudgetForm;