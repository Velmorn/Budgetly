export const getExpenseTransactions = (transactions) => {
    return transactions.filter(tx => tx.type === 'EXPENSE');
};

export const getIncomeTransactions = (transactions) => {
    return transactions.filter(tx => tx.type === 'INCOME');
};