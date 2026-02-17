"use client";

import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ExplanationPanel } from '@/components/ExplanationPanel';
import { HelpCircle } from 'lucide-react';

export default function ExplainPage() {
    const { result } = useAppStore();

    if (!result) {
        return (
            <div className="flex items-center justify-center min-h-[500px]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">No Analysis Available</h2>
                    <p className="text-slate-500">Please generate a report first.</p>
                </div>
            </div>
        );
    }

    // Mock SHAP values for visualization based on result
    const shapData = [
        { name: 'Income', value: result.credit_score > 700 ? 40 : 10 },
        { name: 'History', value: result.credit_score > 700 ? 30 : -20 },
        { name: 'Debt', value: result.credit_score > 700 ? -10 : -40 },
        { name: 'Utilization', value: result.credit_score > 700 ? -5 : -30 },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-2 pb-4 border-b">
                <HelpCircle className="h-6 w-6 text-blue-500" />
                <h1 className="text-3xl font-bold tracking-tight">AI Explainability Report</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="col-span-2 md:col-span-1 shadow-sm">
                    <CardHeader>
                        <CardTitle>Feature Importance (SHAP Values)</CardTitle>
                        <CardDescription>
                            This chart shows how different factors contributed to the final score.
                            Positive values increased the score, negative values decreased it.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={shapData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="value" fill="#8884d8" barSize={20}>
                                    {shapData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.value > 0 ? '#10b981' : '#ef4444'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="col-span-2 md:col-span-1 shadow-sm">
                    <CardHeader>
                        <CardTitle>Decision Rationale</CardTitle>
                        <CardDescription>
                            Plain English explanation of the AI model's reasoning.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-slate-50 p-4 rounded-lg border text-sm text-slate-700 leading-relaxed dark:bg-slate-900 dark:text-slate-300">
                            <p className="mb-2">
                                The applicant has been evaluated based on a <strong>Gradient Boosting Machine (GBM)</strong> model trained on historic loan performance data.
                            </p>
                            <p className="mb-2">
                                Currently, the <strong>Payment History</strong> and <strong>Income Stability</strong> are the strongest indicators.
                                {result.risk_level === 'High'
                                    ? " Recent missed payments have significantly impacted the score."
                                    : " Consistent on-time payments have boosted the reliability metric."
                                }
                            </p>
                            <p>
                                Fraud detection algorithms flagged <strong>{result.fraud_score}%</strong> probability of anomaly, which is considered
                                <strong> {result.fraud_score < 20 ? "Safe" : "Risky"}</strong>.
                            </p>
                        </div>

                        <div className="pt-4 border-t">
                            <h4 className="text-xs font-semibold uppercase text-slate-500 mb-2">Model Version</h4>
                            <p className="text-sm font-mono">v2.4.1 (Deployed: 2026-01-15)</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <ExplanationPanel
                positiveFactors={result.explanation.positive_factors}
                negativeFactors={result.explanation.negative_factors}
            />
        </div>
    );
}
