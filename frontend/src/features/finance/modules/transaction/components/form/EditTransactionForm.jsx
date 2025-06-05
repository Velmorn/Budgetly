import React, {useEffect, useState} from 'react';
import classes from './EditTransactionForm.module.scss';
import {useNavigate, useParams} from "react-router-dom";
import TransactionService from "../../../../API/TransactionService.js";
import CategoryModal from "../../../category/components/modal/CategoryModal.jsx";
import CustomAlert from "../../../../components/UI/Alert/CustomAlert.jsx";
import CategoryService from "../../../../API/CategoryService.js";
import Loader from "../../../../../../components/loader/Loader.jsx";
import styles from "./CreateTransactionForm.module.scss";
import FormButton from "../../../../components/UI/Button/FormButton.jsx";

const EditTransactionForm = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [alert, setAlert] = useState(null);
    const [form, setForm] = useState({
        title: null,
        note: null,
        categoryId: null,
        amount: null,
        date: null,
    });
    const [categories, setCategories] = useState([]);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await CategoryService.getAll();
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }finally {
                setIsLoading(false);
            }
        };
        fetchCategories();
    }, []);


    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await TransactionService.updateTransaction(id, form);
            setAlert({
                title: "Транзакцію оновлено",
                type: "success",
                message: "Транзакція успішно оновлена"
            });
            setTimeout(() => { navigate(-1);}, 1000);
        } catch (error) {
            setAlert({
                title: "Помилка оновлення транзакції",
                type: "error",
                message: error?.response?.data?.message || error?.message || "Сталася невідома помилка"
            });
        }
    };

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={classes.form}>
               <div className={classes.categoryNameLine}>
                   <button
                       type="button"
                       className={classes.categoryButton}
                       onClick={() => setIsCategoryModalOpen(true)}
                       style={{
                           backgroundColor: selectedCategory?.color || '#ccc',
                       }}
                   >
                       {selectedCategory?.iconUrl ? (
                           <img src={selectedCategory.iconUrl} alt="icon" width={42} height={42}/>
                       ) : (
                           '+'
                       )}
                   </button>
                   <input
                       className={classes.inputName}
                       type="text"
                       name="title"
                       value={form.title}
                       onChange={handleChange}
                       placeholder="Назва"
                   />
               </div>

                <input
                    className={classes.inputName}
                    type="text"
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                    placeholder="Примітка"
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="0"
                    value={form.amount}
                    onChange={handleChange}
                    className={classes.inputSum}
                />
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    className={classes.inputDate}
                    onChange={handleChange}
                />

                <FormButton type="submit" disabled={!form.title && !form.date && !form.amount && !form.categoryId && !form.note}>
                    Оновити транзакцію
                </FormButton>

            </form>
            <CategoryModal
                isOpen={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
                categories={categories}
                onSelect={(category) => {
                    setSelectedCategory(category);
                    setForm({...form, categoryId: category.id});
                }}
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

export default EditTransactionForm;