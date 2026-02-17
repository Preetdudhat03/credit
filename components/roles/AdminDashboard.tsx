"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Users,
    ShieldCheck,
    Terminal,
    Server,
    Settings,
    Database,
    Eye,
    Lock,
    Key,
    Smartphone,
    Search,
    RefreshCw,
    Activity
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const activeUsers = [
    { id: 'U-001', name: 'Admin One', role: 'Administrator', status: 'Online', lastLogin: 'Just now' },
    { id: 'U-002', name: 'Loan Officer A', role: 'Loan Officer', status: 'Active', lastLogin: '10 mins ago' },
    { id: 'U-003', name: 'Risk Lead', role: 'Risk Manager', status: 'Inactive', lastLogin: '2d ago' },
];

const auditLogs = [
    { event: 'Decision Override', user: 'Risk Lead', target: 'APP-722', time: '14:22:10', ip: '10.0.4.12' },
    { event: 'User Creation', user: 'Admin One', target: 'U-044', time: '13:05:44', ip: '10.0.0.1' },
    { event: 'Password Reset', user: 'System', target: 'U-012', time: '11:55:02', ip: 'Internal' },
];

export function AdminDashboard() {
    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">System Control Panel</h2>
                    <p className="text-slate-500">Security governance, user orchestration, and audit monitoring.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Terminal className="h-4 w-4 mr-2" /> Live logs
                    </Button>
                    <Button size="sm">
                        <Settings className="h-4 w-4 mr-2" /> Global Config
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-l-4 border-l-blue-600">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Session Health</CardTitle>
                        <Activity className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">99.98%</div>
                        <p className="text-xs text-slate-500 mt-1">SLA target met</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-purple-600">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Encryption Status</CardTitle>
                        <Lock className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">AES-256GCM</div>
                        <p className="text-xs text-slate-500 mt-1">All PII at rest compliant</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-green-600">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">WhatsApp Gateway</CardTitle>
                        <Smartphone className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Operational</div>
                        <p className="text-xs text-slate-500 mt-1">Latency: 120ms</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-orange-600">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Auth Failures</CardTitle>
                        <ShieldCheck className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0.02%</div>
                        <p className="text-xs text-slate-500 mt-1">Normal baseline</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-2">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>User Management</CardTitle>
                                <CardDescription>Provision and modify access for bank personnel.</CardDescription>
                            </div>
                            <div className="flex gap-2">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                                    <Input placeholder="Search users..." className="pl-8 h-9 w-[200px]" />
                                </div>
                                <Button size="sm">Add User</Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {activeUsers.map((u) => (
                                <div key={u.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold">
                                            {u.name.split(' ').map(x => x[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">{u.name}</p>
                                            <p className="text-xs text-slate-500 italic">{u.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="text-xs font-medium">{u.lastLogin}</p>
                                            <Badge variant={u.status === 'Online' ? 'default' : 'secondary'} className="text-[10px] h-4">
                                                {u.status}
                                            </Badge>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                                            <Settings className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Audit Logs</CardTitle>
                            <RefreshCw className="h-4 w-4 text-slate-400 animate-spin-slow" />
                        </div>
                        <CardDescription>Foreground action tracking.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 font-mono text-[11px]">
                            {auditLogs.map((log, i) => (
                                <div key={i} className="flex flex-col gap-1 border-b pb-3 last:border-0">
                                    <div className="flex justify-between font-bold text-slate-900">
                                        <span>{log.event}</span>
                                        <span className="text-slate-400">{log.time}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500">
                                        <span>User: {log.user}</span>
                                        <span>IP: {log.ip}</span>
                                    </div>
                                    <span className="text-primary truncate">Target: {log.target}</span>
                                </div>
                            ))}
                        </div>
                        <Button variant="link" className="w-full text-xs mt-4">View All Logs</Button>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Server Health</CardTitle>
                    <CardDescription>Physical cluster status across regions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                                <span>Compute (Region 1)</span>
                                <span>34%</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[34%]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                                <span>Memory (Static)</span>
                                <span>62%</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500 w-[62%]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                                <span>Database IOPS</span>
                                <span>12%</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[12%]" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
