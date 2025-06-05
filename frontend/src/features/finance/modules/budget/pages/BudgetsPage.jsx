import React, {useEffect, useState} from 'react';
import BudgetService from "../../../API/BudgetService.js";
import PageToolbar from "../../../components/toolbar/PageToolbar.jsx";
import CreateButton from "../../../components/UI/Button/CreateButton.jsx";
import BudgetsList from "../components/card/BudgetsList.jsx";
import {checkAndUpdateBudgetPeriods} from "../../../utils/checkAndUpdateBudgetPeriods.js";
import Loader from "../../../../../components/loader/Loader.jsx";
import GoalService from "../../../API/GoalService.js";
import {useNavigate} from "react-router-dom";

const BudgetsPage = () => {
    const navigate = useNavigate();
    const [budgets, setBudgets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [periodsChecked, setPeriodsChecked] = useState(false);


    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const data = await BudgetService.getAll();
                setBudgets(data);
            } catch (e) {
                setError('Не вдалося завантажити бюджети');
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBudgets();
    }, []);

    useEffect(() => {
        if (!isLoading && budgets.length > 0 && !periodsChecked) {
            checkAndUpdateBudgetPeriods(budgets);
            setPeriodsChecked(true);
        }
    }, [isLoading, budgets, periodsChecked]);



    if(isLoading) {
        return (
            <Loader/>
        )
    }

    return (
        <div>
            <PageToolbar
                leftContent={null}
                rightContent={<CreateButton onClick={() => navigate("/budgets/create")}/>}
                title="Бюджети"
                color="var(--primary-color)"
            />
            <h1 style={{textAlign: "center"}}>Бюджети</h1>
            <BudgetsList budgets={budgets}/>
        </div>
    );
};

export default BudgetsPage;