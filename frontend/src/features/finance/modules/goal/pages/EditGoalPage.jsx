import React from 'react';
import PageToolbar from "../../../components/toolbar/PageToolbar.jsx";
import ReturnButton from "../../../components/UI/Button/ReturnButton.jsx";
import EditGoalForm from "../components/form/EditGoalForm.jsx";

const EditGoalPage = () => {
    return (
        <div>
            <PageToolbar leftContent={<ReturnButton />}/>
            <h1 style={{ textAlign: "center" }}>Оновити ціль</h1>
            <EditGoalForm/>
        </div>
    );
};

export default EditGoalPage;