import React, {useState} from 'react';
import GoalService from "../../../../API/GoalService.js";
import IconPickerModal from "../../../../components/modal/IconPickerModal.jsx";
import ColorCarousel from "../../../../components/UI/Input/ColorCarousel.jsx";
import FormButton from "../../../../components/UI/Button/FormButton.jsx";
import classes from "./GoalForm.module.scss";
import {useNavigate} from "react-router-dom";
import CustomAlert from "../../../../components/UI/Alert/CustomAlert.jsx";


const CreateGoalForm = () => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);
    const [goal, setGoal] = useState({
        name: '',
        targetAmount: '',
        amount: 0,
        startDate: '',
        color: '',
        iconUrl: ''
    });

    const [isIconModalOpen, setIsIconModalOpen] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setGoal((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleColorSelect = (color) => {
        setGoal((prev) => ({
            ...prev,
            color
        }));
    };

    const handleIconSelect = (iconUrl) => {
        setGoal((prev) => ({
            ...prev,
            iconUrl
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newGoal = await GoalService.createGoal(goal);
            setAlert({
                title: "Ціль створено",
                type: "success",
                message: "Ціль успішно створено"
            });
            setTimeout(() => { navigate(-1);}, 1000);

        } catch (error) {
            setAlert({
                title: "Помилка створення цілі",
                type: "error",
                message: error?.response?.data?.message || error?.message || "Сталася невідома помилка"
            });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className={classes.form}>

                <div className={classes.iconNameLine}>
                    <button type="button" onClick={() => setIsIconModalOpen(true)} className={classes.iconChangeButton}
                            style={{backgroundColor: goal.color}}>
                        {goal.iconUrl && (
                            <img
                                src={goal.iconUrl}
                                alt="Icon"
                                style={{width: 50, height: 50}}
                            />
                        )}
                    </button>
                    <input
                        className={classes.inputName}
                        type="text"
                        name="name"
                        value={goal.name}
                        onChange={handleChange}
                        placeholder="Назва"
                        required
                    />
                </div>

                <ColorCarousel selectedColor={goal.color} onColorSelect={handleColorSelect}/>

                <div className={classes.sumWrapper}>
                    <div className={classes.sumField}>
                        <label className={classes.label}>Ціль</label>
                        <input
                            type="number"
                            name="targetAmount"
                            value={goal.targetAmount}
                            onChange={handleChange}
                            className={classes.inputSum}
                            required
                        />
                    </div>
                    <div className={classes.sumField}>
                        <label className={classes.label}>Почати з</label>
                        <input
                            type="number"
                            name="amount"
                            value={goal.amount}
                            onChange={handleChange}
                            className={classes.inputSum}
                            required
                        />
                    </div>
                </div>
                <input
                    type="date"
                    name="startDate"
                    value={goal.startDate}
                    onChange={handleChange}
                    className={classes.inputDate}
                    required
                />

                <FormButton type="submit" disabled={
                    !goal.name || !goal.targetAmount || !goal.color || !goal.iconUrl || !goal.startDate}>
                    Створити ціль
                </FormButton>
            </form>

            <IconPickerModal
                isOpen={isIconModalOpen}
                onClose={() => setIsIconModalOpen(false)}
                onSelectIcon={handleIconSelect}
            />
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

export default CreateGoalForm;