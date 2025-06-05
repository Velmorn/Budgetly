import {getCurrencyByCode} from "./getCurrencyByCode.js";

export function convertCurrency(amount, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) return amount;

    const from = getCurrencyByCode(fromCurrency);
    const to = getCurrencyByCode(toCurrency);

    if (!from || !to) {
        console.warn(`Currency code not found: ${fromCurrency} or ${toCurrency}`);
        return amount;
    }

    const amountInUsd = amount * from.rateToUsd;
    return amountInUsd / to.rateToUsd;
}
