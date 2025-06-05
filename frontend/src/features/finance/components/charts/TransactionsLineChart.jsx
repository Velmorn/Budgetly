import React, {useMemo} from 'react';
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import classes from './ChartWrapper.module.scss';

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('uk-UA', {day: 'numeric', month: 'short'});
};

const TransactionsLineChart = ({transactions, color = '#1976d2'}) => {
    const data = useMemo(() => {
        const grouped = {};

        transactions.forEach(({date, amount, type}) => {
            const day = new Date(date).toISOString().slice(0, 10);
            if (!grouped[day]) grouped[day] = 0;

            if (type === 'INCOME') {
                grouped[day] += amount;
            } else if (type === 'EXPENSE') {
                grouped[day] -= amount;
            }
        });

        const sortedDates = Object.keys(grouped).sort((a, b) => new Date(a) - new Date(b));

        let cumulativeSum = 0;
        return sortedDates.map(date => {
            cumulativeSum += grouped[date];
            return {date, balance: cumulativeSum};
        });
    }, [transactions]);

    return (
        <div className={classes.wrapper}>
            <ResponsiveContainer width="100%" height={280}>
                <LineChart data={data} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis
                        dataKey="date"
                        tickFormatter={formatDate}
                        interval="preserveStartEnd"
                        minTickGap={20}
                    />
                    <YAxis/>
                    <Tooltip
                        labelFormatter={formatDate}
                        formatter={(value) => value.toFixed(2)}
                    />
                    <Line
                        type="monotone"
                        dataKey="balance"
                        stroke={color}
                        strokeWidth={3} // <- товщина лінії
                        dot={false}
                        name="Баланс"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TransactionsLineChart;
