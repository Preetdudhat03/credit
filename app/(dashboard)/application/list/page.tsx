"use client";

import { useAuthStore } from '@/lib/auth-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    Search,
    Filter,
    Download,
    MoreHorizontal,
    Eye,
    CheckCircle2,
    XCircle,
    AlertTriangle
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { RiskBadge } from '@/components/RiskBadge';
import { maskIdentifier } from '@/lib/rbac';

const allApplications = [
    { id: 'APP-102', name: 'James Doe', phone: '9876543210', score: 780, risk: 'Low', status: 'Pending', officer: 'James Officer' },
    { id: 'APP-105', name: 'Sarah Miller', phone: '8877665544', score: 620, risk: 'Medium', status: 'In Review', officer: 'James Officer' },
    { id: 'APP-110', name: 'Robert Fox', phone: '7766554433', score: 450, risk: 'High', status: 'Flagged', officer: 'Pending Assign' },
    { id: 'APP-115', name: 'Alice Wong', phone: '6655443322', score: 810, risk: 'Low', status: 'Approved', officer: 'Sarah Risk' },
    { id: 'APP-120', name: 'Kevin Hart', phone: '5544332211', score: 380, risk: 'High', status: 'Rejected', officer: 'Sarah Risk' },
];

export default function ApplicationListPage() {
    const { user } = useAuthStore();

    if (!user || (user.role !== 'loan_officer' && user.role !== 'risk_manager')) {
        return <div className="p-8 text-center">Unauthorized access. Staff credentials required.</div>;
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Application Pipeline</h2>
                    <p className="text-slate-500">View and manage all incoming credit applications.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" /> Export
                    </Button>
                    <Button size="sm">
                        <Filter className="h-4 w-4 mr-2" /> Filter
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="relative w-96">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                            <Input placeholder="Search applicant, ID, or officer..." className="pl-9" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID & Applicant</TableHead>
                                <TableHead>Masked Contact</TableHead>
                                <TableHead>AI Score</TableHead>
                                <TableHead>Risk</TableHead>
                                <TableHead>Assigned To</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allApplications.map((app) => (
                                <TableRow key={app.id}>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-bold">{app.name}</span>
                                            <span className="text-xs text-slate-500">{app.id}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-mono text-xs">
                                        {maskIdentifier(app.phone, 'phone')}
                                    </TableCell>
                                    <TableCell className="font-bold">{app.score}</TableCell>
                                    <TableCell>
                                        <RiskBadge level={app.risk} />
                                    </TableCell>
                                    <TableCell className="text-sm">{app.officer}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            app.status === 'Approved' ? 'default' :
                                                app.status === 'Rejected' ? 'destructive' :
                                                    'secondary'
                                        } className="capitalize">
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
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Options</DropdownMenuLabel>
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <Eye className="mr-2 h-4 w-4" /> View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="cursor-pointer text-green-600">
                                                    <CheckCircle2 className="mr-2 h-4 w-4" /> Quick Approve
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer text-red-600">
                                                    <XCircle className="mr-2 h-4 w-4" /> Reject Case
                                                </DropdownMenuItem>
                                                {user.role === 'risk_manager' && (
                                                    <DropdownMenuItem className="cursor-pointer text-blue-600 font-semibold">
                                                        <AlertTriangle className="mr-2 h-4 w-4" /> Override Decision
                                                    </DropdownMenuItem>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
