"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

interface CreditScoreGaugeProps {
    score: number;
}

export function CreditScoreGauge({ score }: CreditScoreGaugeProps) {
    // Normalize score to percentage (300-900 range)
    const minScore = 300;
    const maxScore = 900;
    const percentage = Math.max(0, Math.min(100, ((score - minScore) / (maxScore - minScore)) * 100));

    const data = [
        { name: 'Score', value: percentage },
        { name: 'Remaining', value: 100 - percentage },
    ];

    const getColor = (s: number) => {
        if (s >= 750) return '#10b981'; // Green
        if (s >= 650) return '#f59e0b'; // Yellow
        if (s >= 550) return '#f97316'; // Orange
        return '#ef4444'; // Red
    };

    const color = getColor(score);

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="h-64 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="70%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius={80}
                            outerRadius={100}
                            paddingAngle={0}
                            dataKey="value"
                            stroke="none"
                            cornerRadius={10}
                        >
                            <Cell key="score" fill={color} />
                            <Cell key="remaining" fill="#e2e8f0" />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <div className="text-4xl font-bold tracking-tighter" style={{ color }}>{score}</div>
                    <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Credit Score</div>
                </div>
            </div>
            <div className="flex w-full justify-between text-xs text-slate-400 px-8 -mt-8">
                <span>300</span>
                <span>900</span>
            </div>
        </div>
    );
}
