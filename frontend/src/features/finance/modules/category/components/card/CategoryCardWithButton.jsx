import React, {useState} from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import classes from "./CategoryCardWithButton.module.scss";
import DeleteModal from "../../../../components/modal/DeleteModal.jsx";
import CustomAlert from "../../../../components/UI/Alert/CustomAlert.jsx";
import {useNavigate} from "react-router-dom";
import BillService from "../../../../API/BillService.js";
import CategoryService from "../../../../API/CategoryService.js"; // створіть відповідний SCSS-модуль

const CategoryCardWithButton = ({ category }) => {
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleDelete = async () => {
        try {
            await CategoryService.delete(category.id);
            setShowDeleteModal(false);
            setAlert({
                title: "Категорію видалено видалено",
                type: "success",
                message: "Категорію успішно видалено"
            });
        } catch (error) {
            setAlert({
                title: "Помилка видалення категорії",
                type: "error",
                message: error?.response?.data?.message || error?.message || "Сталася невідома помилка"
            });
        }
    };

    return (
        <div className={classes.card}>
            <div
                className={classes.iconWrapper}
                style={{ backgroundColor: category.color }}
            >
                <img src={category.iconUrl} alt={category.name} className={classes.icon} />
            </div>

            <div className={classes.name}>{category.name}</div>

            <div className={classes.actions}>
                <button onClick={() =>  navigate(`/categories/edit/${category.id}`)}>
                    <MdEdit size={20} />
                </button>
                <button onClick={() => setShowDeleteModal(true)}>
                    <MdDelete size={20} />
                </button>
            </div>
            {showDeleteModal && (
                <DeleteModal
                    title="Видалити категорію"
                    objectName={category.name}
                    message="Ця дія є незворотною. Ви впевнені, що хочете видалити цю категорію разом з усіма транзакціями?"
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

export default CategoryCardWithButton;