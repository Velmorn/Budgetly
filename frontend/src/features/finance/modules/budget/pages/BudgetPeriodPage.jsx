import React, {useEffect, useState} from 'react';
import PageToolbar from "../../../components/toolbar/PageToolbar.jsx";
import ReturnButton from "../../../components/UI/Button/ReturnButton.jsx";
import HistoryButton from "../../../components/UI/Button/HistoryButton.jsx";
import {useParams} from "react-router-dom";
import BudgetService from "../../../API/BudgetService.js";
import TransactionService from "../../../API/TransactionService.js";
import Loader from "../../../../../components/loader/Loader.jsx";
import BudgetFullCard from "../components/card/BudgetFullCard.jsx";
import CategoryPieChart from "../../../components/charts/CategoryPieChart.jsx";
import TransactionCategoryList from "../../../components/cards/TransactionCategoryList.jsx";

const BudgetPeriodPage = () => {
    const { budgetId, periodId } = useParams();
    const [budget, setBudget] = useState(null);
    const [budgetPeriod, setBudgetPeriod] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const budgetData = await BudgetService.getById(budgetId);
                setBudget(budgetData);

                const budgetPeriodData = await BudgetService.getPeriodById(periodId);
                setBudgetPeriod(budgetPeriodData);

                const transactionsData = await TransactionService.getByBudgetPeriodId(periodId);
                setTransactions(transactionsData);
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [budgetId, periodId]);

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div>
            <PageToolbar leftContent={<ReturnButton/>}/>
            <BudgetFullCard budget={budget} budgetPeriod={budgetPeriod} />
            <CategoryPieChart transactions={transactions}/>
            <TransactionCategoryList transactions={transactions}/>
        </div>
    );
};

export default BudgetPeriodPage;