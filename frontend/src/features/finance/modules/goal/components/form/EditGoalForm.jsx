import React, {useState} from 'react';
import classes from "./GoalForm.module.scss";
import ColorCarousel from "../../../../components/UI/Input/ColorCarousel.jsx";
import FormButton from "../../../../components/UI/Button/FormButton.jsx";
import IconPickerModal from "../../../../components/modal/IconPickerModal.jsx";
import GoalService from "../../../../API/GoalService.js";
import {useNavigate, useParams} from "react-router-dom";
import CustomAlert from "../../../../components/UI/Alert/CustomAlert.jsx";

const EditGoalForm = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);
    const [goal, setGoal] = useState({
        name: null,
        targetAmount: null,
        startDate: null,
        color: null,
        iconUrl: null
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

    const updateGoal = async (e) => {
        e.preventDefault();
        try {
            await GoalService.updateGoal(id, goal);
            setAlert({
                title: "Ціль оновлено",
                type: "success",
                message: "Ціль успішно оновлено"
            });
            setTimeout(() => { navigate(-1);}, 1000);
        } catch (error) {
            setAlert({
                title: "Помилка оновлення цілі",
                type: "error",
                message: error?.response?.data?.message || error?.message || "Сталася невідома помилка"
            });
        }
    };

    return (
        <div>
            <form onSubmit={updateGoal} className={classes.form}>

                <div className={classes.iconNameLine}>
                    <button type="button" onClick={() => setIsIconModalOpen(true)} className={classes.iconChangeButton} style={{backgroundColor: goal.color}}>
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
                    />
                </div>

                <ColorCarousel selectedColor={goal.color} onColorSelect={handleColorSelect}/>

                    <div className={classes.sumWrapper}>
                        <label className={classes.label}>Ціль</label>
                        <input
                            type="number"
                            name="targetAmount"
                            value={goal.targetAmount}
                            onChange={handleChange}
                            className={classes.inputSum}
                        />
                    </div>
                <input
                    type="date"
                    name="startDate"
                    value={goal.startDate}
                    onChange={handleChange}
                    className={classes.inputDate}
                />

                <FormButton type="submit" disabled={
                    !goal.name && !goal.targetAmount && !goal.color && !goal.iconUrl && !goal.startDate}>
                    Оновити ціль
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

export default EditGoalForm;