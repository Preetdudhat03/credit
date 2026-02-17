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
    Users,
    Search,
    UserPlus,
    Shield,
    MoreHorizontal,
    UserCheck,
    UserX,
    Key
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const userList = [
    { id: '1', name: 'James Officer', email: 'james@bank.com', role: 'loan_officer', status: 'Active', department: 'Retail Loans' },
    { id: '2', name: 'Sarah Risk', email: 'sarah@bank.com', role: 'risk_manager', status: 'Active', department: 'Risk Analytics' },
    { id: '3', name: 'Admin Root', email: 'admin@bank.com', role: 'admin', status: 'Active', department: 'IT Security' },
    { id: '4', name: 'Old Staff', email: 'old@bank.com', role: 'loan_officer', status: 'Disabled', department: 'Mortgages' },
];

export default function UserManagementPage() {
    const { user } = useAuthStore();

    if (!user || user.role !== 'admin') {
        return <div className="p-8 text-center text-red-500 font-bold">UNAUTHORIZED</div>;
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
                    <p className="text-slate-500">Manage bank personnel, assign roles, and control access permissions.</p>
                </div>
                <Button>
                    <UserPlus className="h-4 w-4 mr-2" /> Create New User
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Personnel Registry</CardTitle>
                        <div className="relative w-72">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                            <Input placeholder="Search name, email, or role..." className="pl-9" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userList.map((u) => (
                                <TableRow key={u.id}>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-bold">{u.name}</span>
                                            <span className="text-xs text-slate-500">{u.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="capitalize">
                                            {u.role.replace('_', ' ')}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm">{u.department}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className={u.status === 'Active' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-slate-100 text-slate-500'}>
                                            {u.status}
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
                                                <DropdownMenuLabel>Manage Access</DropdownMenuLabel>
                                                <DropdownMenuItem>
                                                    <Shield className="mr-2 h-4 w-4" /> Change Role
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Key className="mr-2 h-4 w-4" /> Reset Password
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                {u.status === 'Active' ? (
                                                    <DropdownMenuItem className="text-red-600">
                                                        <UserX className="mr-2 h-4 w-4" /> Disable User
                                                    </DropdownMenuItem>
                                                ) : (
                                                    <DropdownMenuItem className="text-green-600">
                                                        <UserCheck className="mr-2 h-4 w-4" /> Enable User
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

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Authentication Logs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 text-xs font-mono">
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-green-600 font-bold">LOGIN_SUCCESS</span>
                                <span>james@bank.com</span>
                                <span className="text-slate-500">10:45:12</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-red-600 font-bold">LOGIN_FAILURE</span>
                                <span>unknown@ext.com</span>
                                <span className="text-slate-500">09:33:04</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-green-600 font-bold">LOGIN_SUCCESS</span>
                                <span>sarah@bank.com</span>
                                <span className="text-slate-500">08:15:33</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Audit Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 text-xs">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-blue-500" />
                                <span>12 Successful Role Modifications this week</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-orange-500" />
                                <span>4 New User Provisioning tasks pending</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                <span>System healthy. No unauthorized access attempts.</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
