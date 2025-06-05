import React, {useEffect, useState} from 'react';
import BudgetService from "../../../API/BudgetService.js";
import Loader from "../../../../../components/loader/Loader.jsx";
import {useParams} from "react-router-dom";
import BudgetPeriodsList from "../components/card/BudgetPeriodsList.jsx";
import PageToolbar from "../../../components/toolbar/PageToolbar.jsx";
import ReturnButton from "../../../components/UI/Button/ReturnButton.jsx";
import PeriodLineChart from '../../../components/charts/PeriodLineChart.jsx';

const BudgetHistoryPage = () => {
    const {id} = useParams();
    const [budget, setBudget] = useState(null);
    const [budgetPeriods, setBudgetPeriods] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const budgetData = await BudgetService.getById(id);
                setBudget(budgetData);

                const budgetPeriodData = await BudgetService.getAllBudgetPeriods(id);
                setBudgetPeriods(budgetPeriodData);
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);


    if (isLoading) {
        return <Loader/>
    }

    return (
        <div>
            <PageToolbar leftContent={<ReturnButton/>} color={budget.color} title={budget.name} />
            <h1 style={{textAlign: "center"}}>Історія</h1>
            <h2 style={{textAlign: "center"}}>{budget.name}</h2>
            <PeriodLineChart periods={budgetPeriods} lineColor={budget.color}/>
            <BudgetPeriodsList budgetPeriods={budgetPeriods} budget={budget} />
        </div>
    );
};

export default BudgetHistoryPage;