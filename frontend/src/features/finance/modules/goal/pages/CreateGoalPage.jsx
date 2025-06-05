import React from 'react';
import CreateGoalForm from "../components/form/CreateGoalForm.jsx";
import PageToolbar from "../../../components/toolbar/PageToolbar.jsx";
import ReturnButton from "../../../components/UI/Button/ReturnButton.jsx";

const CreateGoalPage = () => {
    return (
        <div>
            <PageToolbar leftContent={<ReturnButton/>}/>
            <h1 style={{ textAlign: "center" }}>Додати ціль</h1>
            <CreateGoalForm/>
        </div>
    );
};

export default CreateGoalPage;