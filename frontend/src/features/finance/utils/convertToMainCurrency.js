import {useAuthentication} from "../../authentication/context/AuthenticationContextProvider.jsx";
import {convertCurrency} from "./convertCurrency.js";

export function convertTransactionsSumToMainCurrency(transactions, user) {
    let transactionSum = 0;
    for (let transaction of transactions) {
        if (transaction.currency !== user.mainCurrency) {
            let convertedSum = convertCurrency(transaction.amount, transaction.currency, user.mainCurrency);
            transactionSum += convertedSum;
        } else {
            transactionSum += transaction.amount;
        }
    }

    return transactionSum;
}

export function convertBillsBalanceToMainCurrency(bills, user) {
    let balanceSum = 0;
    for (let bill of bills) {
        if(bill.currency !== user.mainCurrency) {
            let convertedSum = convertCurrency(bill.balance, bill.currency, user.mainCurrency);
            balanceSum += convertedSum;
        } else {
            balanceSum += bill.balance;
        }
    }

    return balanceSum;
}