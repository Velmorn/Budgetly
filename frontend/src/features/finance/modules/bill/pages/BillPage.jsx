import React, {useEffect, useRef, useState} from 'react';
import BillService from "../../../API/BillService.js";
import {useNavigate, useParams} from "react-router-dom";
import TransactionService from "../../../API/TransactionService.js";
import TotalAmountCard from "../../../components/cards/TotalAmountCard.jsx";
import TransactionSumCard from "../../../components/cards/TransactionSumCard.jsx";
import TransactionsLineChart from "../../../components/charts/TransactionsLineChart.jsx";
import PageToolbar from "../../../components/toolbar/PageToolbar.jsx";
import CategoryPieChart from "../../../components/charts/CategoryPieChart.jsx";
import {getExpenseTransactions, getIncomeTransactions} from "../../../utils/transactionUtils.js";
import TransactionTypeToggle from "../../../components/UI/Button/TransactionTypeToggle.jsx";
import TransactionCategoryList from "../../../components/cards/TransactionCategoryList.jsx";
import EditButton from "../../../components/UI/Button/EditButton.jsx";
import ReturnButton from "../../../components/UI/Button/ReturnButton.jsx";
import TransferButton from "../../../components/UI/Button/TransferButton.jsx";
import AdjustBalanceButton from "../../../components/UI/Button/AdjustBalanceButton.jsx";
import DeleteButton from "../../../components/UI/Button/DeleteButton.jsx";
import DeleteModal from "../../../components/modal/DeleteModal.jsx";
import CorrectBalanceModal from "../component/modal/CorrectBalanceModal.jsx";
import TransferModal from "../component/modal/TransferModal.jsx";
import Loader from "../../../../../components/loader/Loader.jsx";
import TransactionDateFilterButton from "../component/UI/button/TransactionDateFilterButton.jsx";

const BillPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [bill, setBill] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [activeType, setActiveType] = useState("EXPENSE");
    const [filterFn, setFilterFn] = useState(() => () => true);
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCorrectModal, setShowCorrectModal] = useState(false);
    const [showTransferModal, setShowTransferModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const billData = await BillService.getById(id);
                setBill(billData);

                const transactionData = await TransactionService.getByBillId(id);
                setTransactions(transactionData);
            } catch (error) {
                console.error("Failed to fetch bill data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);


    const handleDelete = async () => {
        try {
            await BillService.deleteBill(id);
            navigate("/home");
        } catch (error) {
            console.error("Помилка видалення рахунку:", error);
        }
    };

    const handleBalanceUpdate = (updatedBill) => {
        setBill(updatedBill);
        setShowCorrectModal(false);
    };

    const handleTransferSuccess = async () => {
        setShowTransferModal(false);
        const updated = await BillService.getById(id);
        setBill(updated);
        const tx = await TransactionService.getByBillId(id);
        setTransactions(tx);
    };

    if(isLoading) {
        return (<Loader/>)
    }
    const filteredTransactions = transactions.filter(filterFn);
    const incomeTransactions = getIncomeTransactions(filteredTransactions);
    const expenseTransactions = getExpenseTransactions(filteredTransactions);
    const selectedTransactions = activeType === "INCOME" ? incomeTransactions : expenseTransactions;

    return (
        <div>
            <PageToolbar
                leftContent={<ReturnButton />}
                rightContent={[
                    <EditButton key="edit" onClick={() => navigate(`/bills/edit/${bill.id}`)} />,
                    <AdjustBalanceButton key="adjust" onClick={() => setShowCorrectModal(true)} />,
                    <TransferButton key="transfer" onClick={() => setShowTransferModal(true)} />,
                    <DeleteButton key="delete" onClick={() => setShowDeleteModal(true)} />,
                ]}
                color={bill.color}
                title={bill.name}
            />

            <h2 style={{textAlign: 'center', marginTop: '50px'}}>{bill.name}</h2>

            <TotalAmountCard
                name="Баланс рахунку"
                sum={bill.balance}
                currency={bill.currency}
                transactionCount={transactions.length}
            />
            <TransactionDateFilterButton onFilterChange={setFilterFn} color={bill.color} />
            <TransactionSumCard transactions={filteredTransactions} currency={bill.currency}/>
            <TransactionsLineChart transactions={filteredTransactions} color={bill.color} />
            <TransactionTypeToggle
                activeType={activeType}
                onChange={setActiveType}
                color={bill.color}
            />
            <CategoryPieChart transactions={selectedTransactions} color={bill.color} />
            <TransactionCategoryList transactions={selectedTransactions} currency={bill.currency} />

            {showDeleteModal && (
                <DeleteModal
                    title="Видалити рахунок"
                    objectName={bill.name}
                    message="Ця дія є незворотною. Ви впевнені, що хочете видалити цей рахунок разом з усіма транзакціями?"
                    onCancel={() => setShowDeleteModal(false)}
                    onDelete={handleDelete}
                />
            )}

            {showCorrectModal && (
                <CorrectBalanceModal
                    bill={bill}
                    onClose={() => setShowCorrectModal(false)}
                    onUpdate={handleBalanceUpdate}
                />
            )}

            {showTransferModal && (
                <TransferModal
                    onClose={() => setShowTransferModal(false)}
                    onTransferred={handleTransferSuccess}
                />
            )}
        </div>
    );
};

export default BillPage;