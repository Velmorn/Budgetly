import React, {useEffect, useState} from 'react';
import BillsScrollableLine from "../../modules/bill/component/card/BillsScrollableLine.jsx";
import BillService from "../../API/BillService.js";
import TransactionService from "../../API/TransactionService.js";
import {useAuthentication} from "../../../authentication/context/AuthenticationContextProvider.jsx";
import GoalService from "../../API/GoalService.js";
import Loader from "../../../../components/loader/Loader.jsx";
import GoalScrollableLine from "../../modules/goal/components/card/GoalScrollableLine.jsx";
import TransactionHeatmap from "../../components/charts/TransactionHeatmap.jsx";
import BudgetScrollableLine from "../../modules/budget/components/card/BudgetScrollableLine.jsx";
import BudgetService from "../../API/BudgetService.js";
import RecentTransactions from "../../modules/transaction/components/card/RecentTransactions.jsx";
import classes from "./DashboardPage.module.scss";
import CategoryPieChart from "../../components/charts/CategoryPieChart.jsx";
import {convertBillsBalanceToMainCurrency, convertTransactionsSumToMainCurrency} from "../../utils/convertToMainCurrency.js";
import TotalAmountCard from "../../components/cards/TotalAmountCard.jsx";
import TransactionSumCard from "../../components/cards/TransactionSumCard.jsx";

const DashboardPage = () => {
    const [bills, setBills] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [goals, setGoals] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {user} = useAuthentication();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const billsData = await BillService.getAll();
                setBills(billsData);

                const transactionsData = await TransactionService.getAll();
                setTransactions(transactionsData);

                const budgetsData = await BudgetService.getAll();
                setBudgets(budgetsData);

                const goalsData = await GoalService.getAll();
                setGoals(goalsData);

            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const incomeTransactions = transactions.filter(tx => tx.type === "INCOME");
    const expenseTransactions = transactions.filter(tx => tx.type === "EXPENSE");
    const billBalancesSum = convertBillsBalanceToMainCurrency(bills, user);


    if (isLoading) {
        return (<Loader/>)
    }

    return (
        <div>
            <h1 style={{marginLeft: "15px"}}>Привіт {user?.username}</h1>
            <BillsScrollableLine bills={bills}/>
            <BudgetScrollableLine budgets={budgets}/>
            <GoalScrollableLine goals={goals}/>
            <div className={classes.contentWrapper}>
                <div>
                    <TotalAmountCard name="Власний капітал" sum={billBalancesSum} currency={user.mainCurrency} transactionCount={transactions.length}/>
                    <TransactionSumCard transactions={transactions} currency={user.mainCurrency}/>
                    {incomeTransactions.length >= 1 && expenseTransactions.length >= 1 ? (
                        <div>
                            <h3 style={{textAlign: 'center'}}>Доходи</h3>
                            <CategoryPieChart transactions={incomeTransactions}/>
                            <h3 style={{textAlign: 'center'}}>Витрати</h3>
                            <CategoryPieChart transactions={expenseTransactions}/>
                            <TransactionHeatmap transactions={transactions}/>
                        </div>
                    ) : (
                        <p style={{textAlign: 'center'}}>Недостатньо даних для аналітики</p>
                    )}
                </div>
                <div>
                    <RecentTransactions transactions={transactions}/>
                </div>
            </div>

        </div>
    );
};

export default DashboardPage;