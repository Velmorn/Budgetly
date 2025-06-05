import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import CategoryService from "../../../../API/CategoryService.js";
import classes from "./CategoryForm.module.scss";
import ColorCarousel from "../../../../components/UI/Input/ColorCarousel.jsx";
import FormButton from "../../../../components/UI/Button/FormButton.jsx";
import IconPickerModal from "../../../../components/modal/IconPickerModal.jsx";
import CustomAlert from "../../../../components/UI/Alert/CustomAlert.jsx";

const EditCategoryForm = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);
    const [form, setForm] = useState({
        name: null,
        color: null,
        iconUrl: null,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleColorSelect = (color) => {
        setForm((prev) => ({
            ...prev,
            color,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await CategoryService.update(id, form);
            setForm({ name: "", color: "", iconUrl: "" });
            setAlert({
                title: "Категорію оновлено",
                type: "success",
                message: "Категорію успішно оновлено"
            });
            setTimeout(() => { navigate(-1);}, 1000);
        } catch (error) {
            setAlert({
                title: "Помилка оновлення категорії",
                type: "error",
                message: error?.response?.data?.message || error?.message || "Сталася невідома помилка"
            });
        }
    };

    const openIconPicker = () => {
        setIsModalOpen(true);
    };

    const closeIconPicker = () => {
        setIsModalOpen(false);
    };

    const handleIconSelect = (iconUrl) => {
        setForm((prev) => ({
            ...prev,
            iconUrl,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className={classes.form} >
            <div className={classes.iconNameLine}>
                <button type="button" onClick={openIconPicker} className={classes.iconBtn} style={{backgroundColor: form.color}}>
                    {form.iconUrl && <img src={form.iconUrl} alt="Іконка категорії" className={classes.icon} />}
                </button>
                <input
                    type="text"
                    name="name"
                    placeholder="Назва категорії"
                    className={classes.inputName}
                    value={form.name}
                    onChange={handleChange}
                />
            </div>

            <ColorCarousel selectedColor={form.color} onColorSelect={handleColorSelect} />

            <FormButton type="submit" disabled={!form.name && !form.iconUrl && !form.color}>
                Оновити категорію
            </FormButton>

            <IconPickerModal
                isOpen={isModalOpen}
                onClose={closeIconPicker}
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
        </form>
    );
};


export default EditCategoryForm;