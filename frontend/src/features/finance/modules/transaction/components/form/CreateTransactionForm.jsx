import React, {useEffect, useState} from 'react';
import TransactionService from "../../../../API/TransactionService.js";
import BillService from "../../../../API/BillService.js";
import CategoryService from "../../../../API/CategoryService.js";
import GoalService from "../../../../API/GoalService.js";
import CategoryModal from "../../../category/components/modal/CategoryModal.jsx";
import BudgetService from "../../../../API/BudgetService.js";
import styles from "./CreateTransactionForm.module.scss"
import classes from "../../../goal/components/form/GoalForm.module.scss";
import Separator from "../../../../../authentication/components/UI/Separator/Separator.jsx";
import BillButton from "../UI/button/BillButton.jsx";
import BudgetButton from "../UI/button/BudgetButton.jsx";
import Loader from "../../../../../../components/loader/Loader.jsx";
import GoalButton from "../UI/button/GoalButton.jsx";
import FormButton from "../../../../components/UI/Button/FormButton.jsx";
import CustomAlert from "../../../../components/UI/Alert/CustomAlert.jsx";
import {useNavigate} from "react-router-dom";

const CreateTransactionForm = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        type: 'EXPENSE',
        note: '',
        categoryId: '',
        amount: '',
        date: '',
        billId: '',
        goalId: '',
        budgetId: '',
    });

    const [bills, setBills] = useState([]);
    const [categories, setCategories] = useState([]);
    const [goals, setGoals] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [alert, setAlert] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const billsData = await BillService.getAll();
                setBills(billsData);

                const categoriesData = await CategoryService.getAll();
                setCategories(categoriesData);

                const goalsData = await GoalService.getAll();
                setGoals(goalsData);

                const budgetsData = await BudgetService.getAll();
                setBudgets(budgetsData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }finally {
                setIsLoading(false);
            }
        };
        fetchData();
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

        const transactionData = {
            ...form,
            amount: parseFloat(form.amount),
            date: new Date(form.date)
        };

        try {
            await TransactionService.createTransaction(transactionData);
            setForm({
                title: '',
                type: 'EXPENSE',
                note: '',
                categoryId: '',
                amount: '',
                date: '',
                billId: '',
                goalId: ''
            });
            setSelectedCategory(null);
            setAlert({
                title: "Транзакцію додано",
                type: "success",
                message: "Транзакція успішно додана"
            });
            setTimeout(() => { navigate(-1);}, 1000);
        } catch (error) {
            setAlert({
                title: "Помилка додавання транзакції",
                type: "error",
                message: error?.response?.data?.message || error?.message || "Сталася невідома помилка"
            });
        }
    };

    if(isLoading) {
        return (<Loader/>)
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.formWrapper}>
                <div className={styles.rightSideContainer}>
                    <div
                        className={styles.transactionCard}
                        style={{
                            backgroundColor: selectedCategory?.color || '#ccc',
                        }}
                    >
                        <div className={styles.typeLine}>
                            <button
                                type="button"
                                className={`${styles.typeButton} ${form.type === 'INCOME' ? styles.active : ''}`}
                                onClick={() => setForm({...form, type: 'INCOME'})}
                                style={{
                                    backgroundColor: form.type === 'INCOME' ? selectedCategory?.color || '#ccc' : 'rgba(0, 0, 0, 0.2)',
                                }}
                            >
                                Доходи
                            </button>
                            <button
                                type="button"
                                className={`${styles.typeButton} ${form.type === 'EXPENSE' ? styles.active : ''}`}
                                onClick={() => setForm({...form, type: 'EXPENSE'})}
                                style={{
                                    backgroundColor: form.type === 'EXPENSE' ? selectedCategory?.color || '#ccc' : 'rgba(0, 0, 0, 0.2)',
                                }}
                            >
                                Витрати
                            </button>
                        </div>

                        <div className={styles.bottomRow}>
                            <button
                                type="button"
                                className={styles.categoryButton}
                                onClick={() => setIsCategoryModalOpen(true)}
                                style={{
                                    backgroundColor: selectedCategory?.color || '#ccc',
                                }}
                            >
                                {selectedCategory?.iconUrl ? (
                                    <img src={selectedCategory.iconUrl} alt="icon" width={24} height={24}/>
                                ) : (
                                    '+'
                                )}
                            </button>

                            <input
                                type="number"
                                name="amount"
                                placeholder="0"
                                value={form.amount}
                                onChange={handleChange}
                                className={styles.amountInput}
                                required
                            />
                        </div>
                    </div>
                    <input
                        type="text"
                        name="title"
                        placeholder="Назва"
                        value={form.title}
                        onChange={handleChange}
                        className={styles.inputField}
                        required
                    />

                    <input
                        type="text"
                        name="note"
                        placeholder="Примітка"
                        value={form.note}
                        onChange={handleChange}
                        className={`${styles.inputField} ${styles.noteInput}`}
                    />
                </div>

                <div className={styles.leftSideContainer}>
                    <div className={styles.dateContainer}>
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            className={classes.inputDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <hr className={styles.separator} />

                    <div>
                        <div>
                            {bills.map((bill) => (
                                <BillButton
                                    key={bill.id}
                                    type="button"
                                    object={bill}
                                    onClick={() => setForm({...form, billId: bill.id})}
                                >
                                     {form.billId === bill.id ? '✓' : ''}
                                </BillButton>
                            ))}
                        </div>
                    </div>

                    <hr className={styles.separator} />

                    {form.type === 'EXPENSE' && (
                        <div>
                            <div>
                                <button
                                    type="button"
                                    className={styles.defaultBtn}
                                    onClick={() => setForm({...form, budgetId: ''})}
                                >
                                    Без бюджету {form.budgetId === '' ? '✓' : ''}
                                </button>
                                {budgets.map((budget) => (
                                    <BudgetButton
                                        key={budget.id}
                                        type="button"
                                        budget={budget}
                                        onClick={() => setForm({...form, budgetId: budget.id})}
                                    >
                                        {form.budgetId === budget.id ? '✓' : ''}
                                    </BudgetButton>
                                ))}
                            </div>
                        </div>
                    )}

                    {form.type === 'INCOME' && (
                        <div>
                            <div>
                                <button
                                    type="button"
                                    className={styles.defaultBtn}
                                    onClick={() => setForm({...form, goalId: ''})}
                                >
                                    Немає цілі {form.goalId === '' ? '✓' : ''}
                                </button>
                                {goals.map((goal) => (
                                    <GoalButton
                                        key={goal.id}
                                        type="button"
                                        goal={goal}
                                        onClick={() => setForm({...form, goalId: goal.id})}
                                    >
                                        {goal.name} {form.goalId === goal.id ? '✓' : ''}
                                    </GoalButton>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <FormButton type="submit" disabled={!form.title || !form.billId || !form.date || !form.amount || !form.categoryId}>
                Додати транзакцію
            </FormButton>

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
        </form>

    );
};

export default CreateTransactionForm;