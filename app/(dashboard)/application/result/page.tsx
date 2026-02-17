"use client";

import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditScoreGauge } from '@/components/CreditScoreGauge';
import { RiskBadge } from '@/components/RiskBadge';
import { FraudScoreCard } from '@/components/FraudScoreCard';
import { Separator } from '@/components/ui/separator';
import { BookOpen, CheckCircle, Wallet, ArrowRight } from 'lucide-react';

export default function ResultPage() {
    const { result, applicationData } = useAppStore();
    const router = useRouter();

    if (!result) {
        return (
            <div className="flex items-center justify-center min-h-[500px]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">No Results Found</h2>
                    <p className="text-slate-500 mb-6">Please submit a new application first.</p>
                    <Button onClick={() => router.push('/application/new')}>Go to New Application</Button>
                </div>
            </div>
        );
    }

    const { credit_score, risk_level, decision, fraud_score, explanation } = result;

    return (
        <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="flex items-center justify-between pb-4 border-b">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Analysis Results</h1>
                    <p className="text-slate-500 text-sm mt-1">Application ID: #REQ-{Math.floor(Math.random() * 10000)} • Generated just now</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => router.push('/application/explain')}>
                        <BookOpen className="mr-2 h-4 w-4" />
                        View Detail Explanation
                    </Button>
                    <Button onClick={() => window.print()}>Export PDF</Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Main Score Card */}
                <Card className="col-span-2 row-span-2 shadow-md border-t-4 border-t-indigo-600">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-xl">TrustScore</CardTitle>
                                <CardDescription>Comprehensive creditworthiness assessment.</CardDescription>
                            </div>
                            <RiskBadge level={risk_level} />
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center pt-0">
                        <CreditScoreGauge score={credit_score} />
                        <div className="w-full mt-4 bg-slate-50 p-4 rounded-lg border flex justify-between items-center dark:bg-slate-900">
                            <div>
                                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Final Decision</span>
                                <div className="flex items-center gap-2 mt-1">
                                    {decision === 'Approved' ? <CheckCircle className="h-6 w-6 text-green-500" /> : null}
                                    <span className={`text-2xl font-bold ${decision === 'Approved' ? 'text-green-600' :
                                            decision === 'Rejected' ? 'text-red-600' : 'text-yellow-600'
                                        }`}>
                                        {decision}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-xs text-slate-400">Valid until</span>
                                <p className="font-medium text-slate-700">June 2026</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Fraud Risk Card */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Fraud Detection</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FraudScoreCard score={fraud_score} />
                    </CardContent>
                </Card>

                {/* Loan Eligibility */}
                <Card className="shadow-sm bg-blue-50 border-blue-100 dark:bg-blue-900/10 dark:border-blue-800">
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <Wallet className="h-4 w-4 text-blue-600" />
                            Loan Eligibility
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end border-b pb-2 border-blue-200 dark:border-blue-800">
                                <span className="text-sm text-slate-600 dark:text-slate-400">Max Amount</span>
                                <span className="text-2xl font-bold text-slate-900 dark:text-slate-50">$ {(applicationData.monthly_income * 12 * 0.4).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-sm text-slate-600 dark:text-slate-400">Interest Rate</span>
                                <span className="text-lg font-bold text-slate-900 dark:text-slate-50">{credit_score > 750 ? "4.5%" : credit_score > 650 ? "6.8%" : "9.2%"} p.a.</span>
                            </div>
                            <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                                View Offers <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* EMI Recommendation */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">EMI Capacity</CardTitle>
                        <CardDescription>Recommended max monthly installment.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-800">$ {(applicationData.monthly_income * 0.35).toLocaleString()}</div>
                        <p className="text-xs text-slate-500 mt-2">
                            Based on 35% debt-to-income ratio guideline.
                            <span className="block mt-1 text-green-600 font-medium">Safe to proceed for standard loans.</span>
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Factors Preview */}
            <h3 className="text-lg font-semibold mt-8 mb-4">Key Influencing Factors</h3>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 border border-green-100 rounded-lg dark:bg-green-900/10 dark:border-green-800/50">
                    <h4 className="font-semibold text-green-800 text-sm mb-2 uppercase dark:text-green-400">Strengths</h4>
                    <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 dark:text-slate-400">
                        {explanation.positive_factors.map((f, i) => <li key={i}>{f}</li>)}
                        {explanation.positive_factors.length === 0 && <li>None identified</li>}
                    </ul>
                </div>
                <div className="p-4 bg-red-50 border border-red-100 rounded-lg dark:bg-red-900/10 dark:border-red-800/50">
                    <h4 className="font-semibold text-red-800 text-sm mb-2 uppercase dark:text-red-400">Risks</h4>
                    <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 dark:text-slate-400">
                        {explanation.negative_factors.map((f, i) => <li key={i}>{f}</li>)}
                        {explanation.negative_factors.length === 0 && <li>None identified</li>}
                    </ul>
                </div>
            </div>
        </div>
    );
}
