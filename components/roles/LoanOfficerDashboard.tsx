"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Users,
    CheckCircle2,
    Clock,
    AlertTriangle,
    MessageSquare,
    FileText,
    Phone,
    MoreHorizontal,
    TrendingUp,
    ShieldCheck,
    ArrowUpRight
} from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { maskIdentifier } from '@/lib/rbac';
import { CreditScoreGauge } from '@/components/CreditScoreGauge';
import { RiskBadge } from '@/components/RiskBadge';
import { ExplanationPanel } from '@/components/ExplanationPanel';

const assignedApps = [
    { id: 'APP-102', name: 'James Doe', phone: '9876543210', score: 780, risk: 'Low', status: 'Pending', date: '2h ago' },
    { id: 'APP-105', name: 'Sarah Miller', phone: '8877665544', score: 620, risk: 'Medium', status: 'In Review', date: '4h ago' },
    { id: 'APP-110', name: 'Robert Fox', phone: '7766554433', score: 450, risk: 'High', status: 'Flagged', date: '1d ago' },
];

export function LoanOfficerDashboard() {
    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight">Loan Officer Dashboard</h2>
                <p className="text-slate-500">Manage your assigned credit applications and perform risk assessments.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="hover:shadow-md transition-all border-l-4 border-l-primary">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Assigned Apps</CardTitle>
                        <Users className="h-4 w-4 text-slate-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-slate-500 mt-1">+3 since morning session</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-all border-l-4 border-l-green-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Ready for Decision</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-slate-500 mt-1">High confidence scores</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-all border-l-4 border-l-yellow-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Support Needed</CardTitle>
                        <Clock className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-slate-500 mt-1">Awaiting docs from client</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-all border-l-4 border-l-red-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Fraud Warnings</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4</div>
                        <p className="text-xs text-red-500 mt-1 font-semibold flex items-center">
                            <ArrowUpRight className="h-3 w-3 mr-1" /> Critical Flags
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card className="shadow-sm">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Assigned Applications</CardTitle>
                            <CardDescription>Directly assigned for review and final decision.</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">View All</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Applicant</TableHead>
                                <TableHead>Masked Phone</TableHead>
                                <TableHead>AI Score</TableHead>
                                <TableHead>Risk Tier</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {assignedApps.map((app) => (
                                <TableRow key={app.id} className="group">
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-900">{app.name}</span>
                                            <span className="text-xs text-slate-500">{app.id}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-mono text-xs">
                                        {maskIdentifier(app.phone, 'phone')}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="font-bold text-sm">{app.score}</div>
                                            <ShieldCheck className={`h-3 w-3 ${app.score > 700 ? 'text-green-500' : 'text-slate-400'}`} />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <RiskBadge level={app.risk as any} />
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="capitalize">
                                            {app.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-56">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" /> Approve Application
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <AlertTriangle className="mr-2 h-4 w-4 text-red-500" /> Reject Application
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <Clock className="mr-2 h-4 w-4 text-blue-500" /> Send for Review
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <MessageSquare className="mr-2 h-4 w-4" /> Add Internal Remarks
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <Phone className="mr-2 h-4 w-4 text-green-600" /> Trigger WhatsApp
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <FileText className="mr-2 h-4 w-4" /> Request Documents
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>SHAP Explanation Summary (Featured Application)</CardTitle>
                    <CardDescription>AI reasoning for the highest priority application (APP-102).</CardDescription>
                </CardHeader>
                <CardContent>
                    <ExplanationPanel
                        positiveFactors={[
                            "High monthly income stability over 12 months",
                            "Low debt-to-income ratio (24%)",
                            "Consistent bank balance maintenance"
                        ]}
                        negativeFactors={[
                            "Recent minor late payment (8 months ago)",
                            "Slightly high transaction frequency in last 30 days"
                        ]}
                    />
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Recommended Actions</CardTitle>
                        <CardDescription>AI-suggested next steps based on financial profile.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-900/50 dark:border-slate-800">
                            <h4 className="font-bold text-sm mb-1">Recommended Loan Amount</h4>
                            <p className="text-2xl font-bold text-primary">₹ 4,50,000</p>
                            <p className="text-xs text-slate-500 mt-1 italic">Based on DTI ratio of 28%</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 rounded-lg border bg-white dark:bg-slate-950">
                                <p className="text-[10px] uppercase font-bold text-slate-400">EMI Suggestion</p>
                                <p className="text-lg font-bold">₹ 12,450</p>
                            </div>
                            <div className="p-3 rounded-lg border bg-white dark:bg-slate-950">
                                <p className="text-[10px] uppercase font-bold text-slate-400">Tenure</p>
                                <p className="text-lg font-bold">36 Months</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Income Stability</CardTitle>
                        <CardDescription>Aggregated metrics from bank statements.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-slate-500">Income Consistency</span>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">High (0.92)</Badge>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-slate-500">Debt-to-Income (DTI)</span>
                            <span className="font-bold">24.5%</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-slate-500">Avg Monthly Balance</span>
                            <span className="font-bold">₹ 82,400</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-500">Transaction Frequency</span>
                            <span className="font-bold">42 txns/mo</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
