import React from 'react';
import CreateBillForm from "../component/form/CreateBillForm.jsx";
import PageToolbar from "../../../components/toolbar/PageToolbar.jsx";
import ReturnButton from "../../../components/UI/Button/ReturnButton.jsx";

const CreateBillPage = () => {
    return (
        <div>
            <PageToolbar leftContent={<ReturnButton/>}/>
            <h1 style={{ textAlign: "center" }}>Створити рахунок</h1>
            <CreateBillForm/>
        </div>
    );
};

export default CreateBillPage;