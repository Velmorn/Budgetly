import React, { useState, useEffect } from 'react';
import GoalService from "../../../API/GoalService.js";
import PageToolbar from "../../../components/toolbar/PageToolbar.jsx";
import CreateButton from "../../../components/UI/Button/CreateButton.jsx";
import GoalsList from "../components/card/GoalsList.jsx";
import {useNavigate} from "react-router-dom";
import Loader from "../../../../../components/loader/Loader.jsx";

const GoalsPage = () => {
    const navigate = useNavigate();
    const [goals, setGoals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const fetchedGoals = await GoalService.getAll();
                setGoals(fetchedGoals);
            } catch (error) {
                console.error('Error fetching goals:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGoals();
    }, []);

    if (isLoading) {
        return (<Loader />)
    }

    return (
        <div style={{alignItems: "center"}}>
            <PageToolbar rightContent={<CreateButton onClick={() => navigate('/goals/create')}/>}
                         title="Цілі"
                         color="var(--primary-color)"/>
            <h1 style={{textAlign: "center"}}>Цілі</h1>
            <GoalsList goals={goals} />
        </div>
    );
};

export default GoalsPage;
