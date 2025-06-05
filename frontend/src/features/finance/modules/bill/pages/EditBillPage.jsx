import React from 'react';
import ReturnButton from "../../../components/UI/Button/ReturnButton.jsx";
import PageToolbar from "../../../components/toolbar/PageToolbar.jsx";
import EditBillForm from "../component/form/EditBillForm.jsx";

const EditBillPage = () => {
    return (
        <div>
            <PageToolbar leftContent={<ReturnButton/>}/>
            <h1 style={{ textAlign: "center" }}>Редагувати рахунок</h1>
            <EditBillForm/>
        </div>
    );
};

export default EditBillPage;