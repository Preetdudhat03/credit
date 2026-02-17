import { useAuthStore } from '@/lib/auth-store';
import { LoanOfficerDashboard } from '@/components/roles/LoanOfficerDashboard';
import { RiskManagerDashboard } from '@/components/roles/RiskManagerDashboard';
import { AdminDashboard } from '@/components/roles/AdminDashboard';
import { CreditScoreGauge } from '@/components/CreditScoreGauge';
import { FraudScoreCard } from '@/components/FraudScoreCard';
import { Users, TrendingUp, ShieldCheck, AlertTriangle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
    const { user } = useAuthStore();

    if (!user) return null;

    if (user.role === 'loan_officer') {
        return <LoanOfficerDashboard />;
    }

    if (user.role === 'risk_manager') {
        return <RiskManagerDashboard />;
    }

    if (user.role === 'admin') {
        return <AdminDashboard />;
    }

    // Default Client View (Existing logic or similar)
    return (
        <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Welcome, {user.name}</h2>
                    <p className="text-slate-500">Track your credit application status and financial insights.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Your AI TrustScore</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center pb-8">
                        <CreditScoreGauge score={745} />
                    </CardContent>
                </Card>
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Risk Health</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center gap-4 py-6">
                            <div className="h-24 w-24 rounded-full border-8 border-green-500 flex items-center justify-center">
                                <span className="text-2xl font-bold text-green-600">Low</span>
                            </div>
                            <p className="text-sm text-center text-slate-500">Your profile shows high stability and low default probability.</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Application Received</p>
                                    <p className="text-xs text-slate-500">Oct 24, 2024</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-50 rounded-lg">
                                    <TrendingUp className="h-4 w-4 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Score Updated</p>
                                    <p className="text-xs text-slate-500">Oct 25, 2024</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
