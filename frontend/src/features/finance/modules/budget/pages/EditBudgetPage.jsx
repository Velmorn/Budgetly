import React from 'react';
import PageToolbar from "../../../components/toolbar/PageToolbar.jsx";
import ReturnButton from "../../../components/UI/Button/ReturnButton.jsx";
import EditBudgetForm from "../components/form/EditBudgetForm.jsx";

const EditBudgetPage = () => {
    return (
        <div>
            <PageToolbar leftContent={<ReturnButton/>}  color="var(--primary-color)" title="Редагувати бюджет"/>
            <h1 style={{ textAlign: "center" }}>Редагувати бюджет</h1>
            <EditBudgetForm/>
        </div>
    );
};

export default EditBudgetPage;