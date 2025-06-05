import React, {useEffect, useState} from 'react';
import GoalFullCard from "../components/card/GoalFullCard.jsx";
import GoalService from "../../../API/GoalService.js";
import {useNavigate, useParams} from "react-router-dom";
import PageToolbar from "../../../components/toolbar/PageToolbar.jsx";
import ReturnButton from "../../../components/UI/Button/ReturnButton.jsx";
import EditButton from "../../../components/UI/Button/EditButton.jsx";
import DeleteButton from "../../../components/UI/Button/DeleteButton.jsx";
import TransactionService from "../../../API/TransactionService.js";
import TransactionList from "../../transaction/components/card/TransactionList.jsx";
import DeleteModal from "../../../components/modal/DeleteModal.jsx";
import BillService from "../../../API/BillService.js";
import Loader from "../../../../../components/loader/Loader.jsx";

const GoalPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [goal, setGoal] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const goalData = await GoalService.getById(id);
                setGoal(goalData);

                const transactionData = await TransactionService.getByGoalId(id);
                setTransactions(transactionData);

            } catch (error) {
                console.error("Failed to fetch goal:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);


    const handleDelete = async () => {
        try {
            await GoalService.deleteGoal(id);
            navigate("/goals");
        } catch (error) {
            console.error("Помилка видалення цілі:", error);
        }
    };

    if (isLoading) {
        return (<Loader/>)
    }

    return (
        <div>
            <PageToolbar leftContent={<ReturnButton/>} rightContent={[
                <EditButton onClick={() => navigate(`/goals/edit/${goal.id}`)}/>,
                <DeleteButton onClick={() => setShowDeleteModal(true)}/>]} startColor={goal.color} title={goal.title}/>
            <GoalFullCard goal={goal}/>
            <p style={{textAlign: "center", fontSize: "14px"}}>{transactions.length} транзакцій</p>
            <TransactionList transactions={transactions}/>

            {showDeleteModal && (
                <DeleteModal
                    title="Видалити ціль"
                    objectName={goal.name}
                    message="Ця дія є незворотною. Ви впевнені, що хочете видалити цю ціль?"
                    onCancel={() => setShowDeleteModal(false)}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default GoalPage;