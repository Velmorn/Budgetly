import React from 'react';
import PageToolbar from "../../../components/toolbar/PageToolbar.jsx";
import ReturnButton from "../../../components/UI/Button/ReturnButton.jsx";
import EditCategoryForm from "../components/form/EditCategoryForm.jsx";

const EditCategoryPage = () => {
    return (
        <div>
            <PageToolbar leftContent={<ReturnButton/>}/>
            <h1 style={{ textAlign: "center" }}>Редагувати категорію</h1>
            <EditCategoryForm />
        </div>
    );
};

export default EditCategoryPage;