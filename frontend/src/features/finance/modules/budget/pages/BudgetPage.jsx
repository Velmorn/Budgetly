import React, {useEffect, useState} from 'react';
import BudgetService from "../../../API/BudgetService.js";
import {useNavigate, useParams} from "react-router-dom";
import BudgetFullCard from "../components/card/BudgetFullCard.jsx";
import PageToolbar from "../../../components/toolbar/PageToolbar.jsx";
import ReturnButton from "../../../components/UI/Button/ReturnButton.jsx";
import Loader from "../../../../../components/loader/Loader.jsx";
import TransactionService from "../../../API/TransactionService.js";
import TransactionCategoryList from "../../../components/cards/TransactionCategoryList.jsx";
import CategoryPieChart from "../../../components/charts/CategoryPieChart.jsx";
import HistoryButton from "../../../components/UI/Button/HistoryButton.jsx";
import DeleteButton from "../../../components/UI/Button/DeleteButton.jsx";
import DeleteModal from "../../../components/modal/DeleteModal.jsx";
import TransactionsLineChart from "../../../components/charts/TransactionsLineChart.jsx";
import EditButton from "../../../components/UI/Button/EditButton.jsx";
import {useAuthentication} from "../../../../authentication/context/AuthenticationContextProvider.jsx";

const BudgetPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [budget, setBudget] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const {user} = useAuthentication();
    const currency = user?.mainCurrency;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const budgetData = await BudgetService.getById(id);
                setBudget(budgetData);

                const transactionsData = await TransactionService.getByBudgetPeriodId(budgetData.currentPeriod.id);
                setTransactions(transactionsData);
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleDelete = async () => {
        try {
            await BudgetService.deleteBudget(id);
            navigate("/budgets");
        } catch (error) {
            console.error("Помилка видалення бюджету:", error);
        }
    };



    if (isLoading) {
        return <Loader/>
    }

    return (
        <div>
            <PageToolbar leftContent={<ReturnButton/>}
                         rightContent={[
                             <HistoryButton onClick={() => navigate(`/budgets/${id}/history`)}/>,
                             <EditButton onClick={() => navigate(`/budgets/edit/${id}`)}/>,
                             <DeleteButton onClick={() => setShowDeleteModal(true)}/>
                         ]}
                         title={budget.name}
                         color={budget.color}
            />
            <BudgetFullCard budget={budget} budgetPeriod={budget.currentPeriod} />
           <TransactionsLineChart transactions={transactions} color={budget.color}/>
            <TransactionCategoryList transactions={transactions} currency={currency} />
            <CategoryPieChart transactions={transactions}/>
            {showDeleteModal && (
                <DeleteModal
                    title="Видалити бюджет"
                    objectName={budget.name}
                    message="Ця дія є незворотною. Ви впевнені, що хочете видалити цей бюджет?"
                    onCancel={() => setShowDeleteModal(false)}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default BudgetPage;