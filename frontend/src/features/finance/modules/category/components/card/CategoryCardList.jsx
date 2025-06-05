import React from "react";
import CategoryCardWithButton from "./CategoryCardWithButton.jsx";

const CategoryCardList = ({ categories }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {categories.map((category) => (
                <CategoryCardWithButton
                    key={category.id}
                    category={category}
                />
            ))}
        </div>
    );
};

export default CategoryCardList;