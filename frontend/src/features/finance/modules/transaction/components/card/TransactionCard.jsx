import React from 'react';
import classes from './TransactionCard.module.scss';
import { ChevronDown, ChevronUp, StickyNote } from 'lucide-react';
import {getCurrencyByCode} from "../../../../utils/getCurrencyByCode.js";
import {useNavigate} from "react-router-dom";

const TransactionCard = ({ transaction }) => {
    const navigate = useNavigate();
    const isIncome = transaction.type === 'INCOME';
    const ArrowIcon = isIncome ? ChevronUp : ChevronDown;
    const currency = getCurrencyByCode(transaction?.currency);
    const symbol = currency?.symbol;

    return (
        <div className={classes.card} onDoubleClick={() => navigate(`/transactions/edit/${transaction.id}`)}>
            <div
                className={classes.iconWrapper}
                style={{ backgroundColor: transaction.category.color }}
            >
                <img
                    src={transaction.category.iconUrl}
                    alt={transaction.category.name}
                    className={classes.icon}
                />
            </div>

            <div className={classes.info}>
                <h4 className={classes.title}>{transaction.title}</h4>
            </div>

            <div className={classes.amountBlock}>
                {transaction.note && (
                    <div className={classes.noteIcon} title={transaction.note}>
                        <StickyNote size={16} />
                    </div>
                )}
                <ArrowIcon
                    size={16}
                    className={isIncome ? classes.iconIncome : classes.iconExpense}
                />
                <span className={classes.amount}>
          {transaction.amount} {symbol}
        </span>
            </div>
        </div>
    );
};

export default TransactionCard;