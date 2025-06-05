import React, {useEffect, useState} from "react";
import classes from "./FilterModal.module.scss";
import CategoryService from "../../../../API/CategoryService.js";
import { MdCategory } from "react-icons/md";
import { Range } from 'react-range';

const FilterModal = ({
                         filters = { category: [], type: [], amountRange: [] },
                         onClose,
                         onApply,
                         onReset,
                         minAmount,
                         maxAmount,
                     }) => {
    const [categories, setCategories] = useState([]);
    const [localFilters, setLocalFilters] = useState({
        category: [],
        type: [],
        amountRange: [minAmount, maxAmount],
        titleContains: '',
        noteContains: '',
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await CategoryService.getAll();
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        setLocalFilters({
            category: filters.category || [],
            type: filters.type || [],
            amountRange: filters.amountRange?.length === 2 ? filters.amountRange : [minAmount, maxAmount],
            titleContains: filters.titleContains || '',
            noteContains: filters.noteContains || '',
        });
    }, [filters, minAmount, maxAmount]);

    const toggleType = (type) => {
        const newTypes = [...(localFilters.type || [])];
        const index = newTypes.indexOf(type);
        index === -1 ? newTypes.push(type) : newTypes.splice(index, 1);
        setLocalFilters({ ...localFilters, type: newTypes });
    };

    const toggleCategory = (categoryId) => {
        const isAllSelected = localFilters.category.length === 0;
        let newCategories = [...localFilters.category];

        if (categoryId === "all") {
            newCategories = [];
        } else {
            if (isAllSelected) {
                newCategories = [categoryId];
            } else {
                const index = newCategories.indexOf(categoryId);
                if (index === -1) newCategories.push(categoryId);
                else newCategories.splice(index, 1);
            }
        }

        setLocalFilters({ ...localFilters, category: newCategories });
    };

    const handleRangeChange = (e, index) => {
        const value = parseFloat(e.target.value);
        const newRange = [...localFilters.amountRange];
        newRange[index] = value;
        if (newRange[0] > newRange[1]) newRange.sort((a, b) => a - b);
        setLocalFilters({ ...localFilters, amountRange: newRange });
    };

    const handleReset = () => {
        const emptyFilters = { category: [], type: [], amountRange: [minAmount, maxAmount] };
        setLocalFilters(emptyFilters);
        if (onReset) onReset();
    };

    const handleApply = () => {
        if (onApply) onApply(localFilters);
        if (onClose) onClose();
    };

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters({ ...localFilters, [name]: value });
    };


    return (
        <div className={classes.backdrop} onClick={onClose}>
            <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
                <h2>Фільтри</h2>

                <div className={classes.categoryFilter}>
                    <div className={classes.categoryScroll}>
                        <div className={classes.categoryWrapper}>
                            <div
                                key="all"
                                className={`${classes.categoryBox} ${localFilters.category.length === 0 ? classes.active : ""}`}
                                style={{ backgroundColor: "var(--primary-color)" }}
                                onClick={() => toggleCategory("all")}
                            >
                                <MdCategory size={40} color="black" />
                            </div>
                            <span className={classes.catName}> Всі </span>
                        </div>
                        {categories.map((cat) => {
                            const isActive = localFilters.category.includes(cat.id);
                            return (
                                <div className={classes.categoryWrapper} key={cat.id}>
                                    <div
                                        className={`${classes.categoryBox} ${isActive ? classes.active : ""}`}
                                        style={{ backgroundColor: cat.color }}
                                        onClick={() => toggleCategory(cat.id)}
                                    >
                                        <img src={cat.iconUrl} alt={cat.name} className={classes.categoryIcon} />
                                    </div>
                                    <span className={classes.catName}> {cat.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={classes.typeFilter}>
                    <div className={classes.typeButtons}>
                        {["INCOME", "EXPENSE"].map((type) => {
                            const isActive = localFilters.type?.includes(type);
                            return (
                                <button
                                    key={type}
                                    type="button"
                                    className={`${classes.typeBtn} ${isActive ? classes[type.toLowerCase()] : ""}`}
                                    onClick={() => toggleType(type)}
                                >
                                    {isActive && <span className={classes.checkmark}>✔</span>}
                                    {type === "INCOME" ? "Доходи" : "Витрати"}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className={classes.amountRange}>
                    <label>
                        Сума: від {localFilters.amountRange[0]} до {localFilters.amountRange[1]}
                    </label>
                    <div className={classes.rangeContainer}>
                        <input
                            type="range"
                            min={minAmount}
                            max={maxAmount}
                            value={localFilters.amountRange[0]}
                            onChange={(e) => handleRangeChange(e, 0)}
                        />
                        <input
                            type="range"
                            min={minAmount}
                            max={maxAmount}
                            value={localFilters.amountRange[1]}
                            onChange={(e) => handleRangeChange(e, 1)}
                        />
                    </div>
                </div>

                <div className={classes.textFilter}>
                    <input
                        type="text"
                        name="titleContains"
                        id="titleContains"
                        value={localFilters.titleContains}
                        onChange={handleTextChange}
                        placeholder="Назва містить..."
                    />
                    <input
                        type="text"
                        name="noteContains"
                        id="noteContains"
                        value={localFilters.noteContains}
                        onChange={handleTextChange}
                        placeholder="Примітка містить..."
                    />
                </div>

                <div className={classes.buttons}>
                    <button onClick={handleReset} type="button">Скинути</button>
                    <button onClick={handleApply} type="button">Застосувати</button>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
