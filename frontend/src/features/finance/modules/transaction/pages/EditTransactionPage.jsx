import React, {useEffect, useState} from 'react';
import PageToolbar from "../../../components/toolbar/PageToolbar.jsx";
import ReturnButton from "../../../components/UI/Button/ReturnButton.jsx";
import DeleteButton from "../../../components/UI/Button/DeleteButton.jsx";
import EditTransactionForm from "../components/form/EditTransactionForm.jsx";
import {useNavigate, useParams} from "react-router-dom";
import DeleteModal from "../../../components/modal/DeleteModal.jsx";
import TransactionService from "../../../API/TransactionService.js";

const EditTransactionPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = async () => {
        try {
            await TransactionService.deleteTransaction(id);
            navigate(-1);
        } catch (error) {
            console.error("Помилка видалення транзакції:", error);
        }
    };

    return (
        <div>
            <PageToolbar leftContent={<ReturnButton/>}
                         rightContent={<DeleteButton onClick={() => setShowDeleteModal(true)}/>}
                         title="Оновити транзакцію"
                         color="var(--primary-color)"/>
            <h1 style={{ textAlign: "center" }}>Оновити транзакцію</h1>
            <EditTransactionForm/>
            {showDeleteModal && (
                <DeleteModal
                    title="Видалити транзакцію"
                    message="Ця дія є незворотною. Ви впевнені, що хочете видалити цю транзакцію?"
                    onCancel={() => setShowDeleteModal(false)}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default EditTransactionPage;