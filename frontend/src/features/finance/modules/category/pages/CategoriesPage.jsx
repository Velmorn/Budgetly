import React, {useEffect, useState} from 'react';
import PageToolbar from "../../../components/toolbar/PageToolbar.jsx";
import CreateButton from "../../../components/UI/Button/CreateButton.jsx";
import {useNavigate} from "react-router-dom";
import BillService from "../../../API/BillService.js";
import Loader from "../../../../../components/loader/Loader.jsx";
import CategoryService from "../../../API/CategoryService.js";
import CategoryCardWithButton from "../components/card/CategoryCardWithButton.jsx";
import CategoryCardList from "../components/card/CategoryCardList.jsx";
import SearchLine from "../components/search/SearchLine.jsx";

const CategoriesPage = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await CategoryService.getAll();
                setCategories(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }

        }
        fetchCategories();
    }, [])

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if(isLoading) {
        return (<Loader/>)
    }

    return (
        <div>
            <PageToolbar rightContent={<CreateButton onClick={() => navigate(`/categories/create`)} />}
                         title="Категорії"
                         color="var(--primary-color)"/>
            <h1 style={{textAlign: "center"}}>Категорії</h1>
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                <SearchLine
                    type="text"
                    placeholder="Пошук категорій..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {filteredCategories.length > 0 ? (
                <CategoryCardList categories={filteredCategories} />
            ) : (
                <p style={{ textAlign: "center", color: "#888" }}>Категорії не знайдено</p>
            )}
        </div>
    );
};

export default CategoriesPage;