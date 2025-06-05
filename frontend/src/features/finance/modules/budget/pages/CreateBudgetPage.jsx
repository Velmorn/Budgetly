import React from 'react';
import CreateBudgetForm from "../components/form/CreateBudgetForm.jsx";
import PageToolbar from "../../../components/toolbar/PageToolbar.jsx";
import ReturnButton from "../../../components/UI/Button/ReturnButton.jsx";

const CreateBudgetPage = () => {
    return (
        <div>
            <PageToolbar leftContent={<ReturnButton/>}  color="var(--primary-color)" title="Cndjhbnb бюджет"/>
            <h1 style={{ textAlign: "center" }}>Створити бюджет</h1>
            <CreateBudgetForm />
        </div>
    );
};

export default CreateBudgetPage;