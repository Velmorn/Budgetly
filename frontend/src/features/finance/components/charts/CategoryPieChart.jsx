import { PieChart, Pie, Cell } from 'recharts';
import { useMemo } from 'react';

const START_ANGLE = 0;
const RADIUS = 100;

const CategoryPieChart = ({ transactions }) => {
    const data = useMemo(() => {
        const m = {};
        transactions.forEach(({ amount, category }) => {
            if (!category?.id) return;
            const { id, name, color } = category;
            m[id] = m[id] || { id, name, color, total: 0 };
            m[id].total += Math.abs(amount);
        });
        return Object.values(m);
    }, [transactions]);

    const total = data.reduce((sum, d) => sum + d.total, 0);

    const topFive = useMemo(() => {
        return [...data]
            .sort((a, b) => b.total - a.total)
            .slice(0, 5);
    }, [data]);

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px' }}>
                {topFive.map(cat => (
                    <div key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                            display: 'inline-block',
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: cat.color
                        }}></span>
                        <span style={{ fontSize: '16px' }}>{cat.name}</span>
                    </div>
                ))}
            </div>

            <div style={{ position: 'relative', width: 300, height: 300 }}>
                <PieChart width={300} height={300}>
                    <Pie
                        data={data}
                        dataKey="total"
                        nameKey="name"
                        cx="50%" cy="50%"
                        innerRadius={50} outerRadius={RADIUS}
                        startAngle={START_ANGLE}
                        endAngle={START_ANGLE + 360}
                        labelLine={false}
                    >
                        {data.map((entry, idx) => (
                            <Cell key={idx} fill={entry.color} />
                        ))}
                    </Pie>
                </PieChart>
            </div>
        </div>
    );
};

export default CategoryPieChart;