import { currencyList } from "../constants/currencyList.js";

export const getCurrencyByCode = (code) => {
    return currencyList.find(c => c.code === code);
};