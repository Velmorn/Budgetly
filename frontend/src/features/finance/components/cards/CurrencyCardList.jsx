import React, {useEffect, useState} from 'react';
import CurrencyCard from "./CurrencyCard.jsx";
import BillService from "../../API/BillService.js";
import classes from './CurrencyCardList.module.scss';


const CurrencyCardList = ({ selectedCurrency, onSelect }) => {
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const data = await BillService.getCurrencies();
                setCurrencies(data);
            } catch (error) {
                console.error("Error loading currencies:", error);
            }
        };

        fetchCurrencies();
    }, []);

    return (
        <div className={classes.root}>
            {currencies.map((currency) => (
                <div
                    key={currency.code}
                    className={`${classes.item} ${selectedCurrency === currency.code ? classes.active : ''}`}
                    onClick={() => onSelect(currency.code)}
                >
                    <CurrencyCard
                        code={currency.code}
                        symbol={currency.symbol}
                        name={currency.name}
                    />
                </div>
            ))}
        </div>
    );
};

export default CurrencyCardList;