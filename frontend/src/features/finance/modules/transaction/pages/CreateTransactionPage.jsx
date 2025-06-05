import React from 'react';
import CreateTransactionForm from "../components/form/CreateTransactionForm.jsx";
import PageToolbar from "../../../components/toolbar/PageToolbar.jsx";
import ReturnButton from "../../../components/UI/Button/ReturnButton.jsx";

const CreateTransactionPage = () => {
    return (
        <div>
            <PageToolbar leftContent={<ReturnButton/>} title="Додати транзакцію" color="var(--primary-color)" />
            <h1 style={{ textAlign: "center" }}>Додати транзакцію</h1>
            <CreateTransactionForm/>
        </div>
    );
};

export default CreateTransactionPage;