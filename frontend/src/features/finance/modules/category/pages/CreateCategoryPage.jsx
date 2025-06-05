import React from 'react';
import CreateCategoryForm from "../components/form/CreateCategoryForm.jsx";
import PageToolbar from "../../../components/toolbar/PageToolbar.jsx";
import ReturnButton from "../../../components/UI/Button/ReturnButton.jsx";

const CreateCategoryPage = () => {
    return (
        <div>
            <PageToolbar leftContent={<ReturnButton/>}/>
            <h1 style={{ textAlign: "center" }}>Створити категорію</h1>
            <CreateCategoryForm />
        </div>
    );
};

export default CreateCategoryPage;