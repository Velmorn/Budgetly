import React, {useEffect, useState} from 'react';
import TransactionService from "../../../API/TransactionService.js";
import TransactionList from "../components/card/TransactionList.jsx";
import PageToolbar from "../../../components/toolbar/PageToolbar.jsx";
import CreateButton from "../../../components/UI/Button/CreateButton.jsx";
import MonthSlider from "../components/slider/MonthSlider.jsx";
import FilterModal from "../components/modal/FilterModal.jsx";
import FilterButton from "../../../components/UI/Button/FilterButton.jsx";
import {useNavigate} from "react-router-dom";
import Loader from "../../../../../components/loader/Loader.jsx";

const TransactionsPage = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [filters, setFilters] = useState({
        category: [],
        type: [],
        amountRange: [],
        titleContains: '',
        noteContains: '',
    });

    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await TransactionService.getAll();
                setTransactions(data);
            } catch (error) {
                console.error("Failed to fetch Transactions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const minAmount = transactions.length > 0 ? Math.min(...transactions.map(t => t.amount)) : 0;
    const maxAmount = transactions.length > 0 ? Math.max(...transactions.map(t => t.amount)) : 0;

    const filteredTransactions = transactions.filter((transaction) => {
        const date = new Date(transaction.date);

        if (date.getMonth() !== selectedMonth || date.getFullYear() !== selectedYear) {
            return false;
        }

        if (filters.category.length > 0 && !filters.category.includes(transaction.category.id)) {
            return false;
        }

        if (filters.type.length > 0 && !filters.type.includes(transaction.type)) {
            return false;
        }

        if (filters.amountRange.length === 2) {
            const [min, max] = filters.amountRange;
            if (transaction.amount < min || transaction.amount > max) {
                return false;
            }
        }

        if (filters.titleContains && !transaction.title?.toLowerCase().includes(filters.titleContains.toLowerCase())) {
            return false;
        }

        if (filters.noteContains && !transaction.note?.toLowerCase().includes(filters.noteContains.toLowerCase())) {
            return false;
        }

        return true;
    });

    const handleMonthChange = (month, year) => {
        setSelectedMonth(month);
        setSelectedYear(year);
    };


    const openFilterModal = () => setIsFilterModalOpen(true);
    const closeFilterModal = () => setIsFilterModalOpen(false);
    const applyFilters = (newFilters) => setFilters(newFilters);
    const resetFilters = () => setFilters({
        category: [],
        type: [],
        amountRange: [],
        titleContains: '',
        noteContains: '',
    });


    if (isLoading) {
        return (<Loader />)
    }

    return (
        <div>
            <PageToolbar
                title="Транзакції"
                color="var(--primary-color)"
                rightContent={
                    [
                        <FilterButton onClick={openFilterModal}/>,
                        <CreateButton onClick={() => navigate("/transactions/create")}/>
                    ]
                }
            />
            <h1 style={{ textAlign: "center" }}>Транзакції</h1>

            <MonthSlider
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                onChange={handleMonthChange}
            />

            <TransactionList transactions={filteredTransactions} />

            {isFilterModalOpen && (
                <FilterModal
                    filters={filters}
                    onClose={closeFilterModal}
                    onApply={applyFilters}
                    onReset={resetFilters}
                    minAmount={minAmount}
                    maxAmount={maxAmount}
                />
            )}
        </div>
    );
};

export default TransactionsPage;