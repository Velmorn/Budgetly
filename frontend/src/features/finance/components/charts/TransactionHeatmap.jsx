import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./TransactionHeatmap.scss";
import { Tooltip } from "react-tooltip";

const TransactionHeatmap = ({ transactions }) => {
    const dailyData = transactions.reduce((acc, tx) => {
        const date = tx.date.split("T")[0];
        if (!acc[date]) acc[date] = { income: 0, expense: 0 };
        if (tx.type === "INCOME") acc[date].income += tx.amount;
        else if (tx.type === "EXPENSE") acc[date].expense += tx.amount;
        return acc;
    }, {});

    const values = Object.keys(dailyData).map((date) => {
        const { income, expense } = dailyData[date];
        let value = 0;
        if (income > expense) value = 1;
        else if (expense > income) value = -1;
        return { date, value };
    });

    const startDate = new Date(new Date().getFullYear(), 0, 1);
    const endDate = new Date(new Date().getFullYear(), 11, 31);

    return (
        <div className="heatmap-wrapper">
            <CalendarHeatmap
                startDate={startDate}
                endDate={endDate}
                values={values}
                showWeekdayLabels={false}
                classForValue={(val) => {
                    if (!val || val.value === 0) return "color-empty";
                    if (val.value === 1) return "color-income";
                    if (val.value === -1) return "color-expense";
                }}
                tooltipDataAttrs={(value) => {
                    if (!value || value.value === 0) return null;
                    const { date } = value;
                    const { income, expense } = dailyData[date] || {};
                    return {
                        'data-tooltip-id': 'transaction-tooltip',
                        'data-tooltip-html': `${date} — ${income ? `Доходи: ${income}` : ""}${income && expense ? ", " : ""}${expense ? `Витрати: ${expense}` : ""}`
                    };
                }}
            />
            <Tooltip id="transaction-tooltip" />
        </div>
    );
};

export default TransactionHeatmap;