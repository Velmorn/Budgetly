import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import classes from './ChartWrapper.module.scss';

const PeriodLineChart = ({ periods, lineColor }) => {
    const currentYear = new Date().getFullYear();

    const data = periods.map(period => {
        const date = new Date(period.startDate);
        const label = date.toLocaleDateString('uk-UA', {
            day: 'numeric',
            month: 'short',
            year: date.getFullYear() !== currentYear ? 'numeric' : undefined
        });
        return {
            date: label,
            amount: period.amount
        };
    });

    return (
        <div className={classes.wrapper}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                        formatter={(value) => `${value} ₴`}
                        labelFormatter={(label) => `Період: ${label}`}
                    />
                    <Line
                        type="monotone"
                        dataKey="amount"
                        stroke={lineColor}
                        strokeWidth={3}
                        dot={{ r: 5 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PeriodLineChart;