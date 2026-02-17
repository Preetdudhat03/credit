"use client";

import { useAuthStore } from '@/lib/auth-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    ShieldCheck,
    Settings,
    Zap,
    Smartphone,
    Mail,
    Lock,
    Globe,
    Server,
    Cpu,
    MemoryStick as Memory
} from 'lucide-react';

export default function SystemControlPage() {
    const { user } = useAuthStore();

    if (!user || user.role !== 'admin') {
        return <div className="p-8 text-center text-red-500 font-bold">CRITICAL: UNAUTHORIZED SYSTEM ACCESS ATTEMPT LOGGED.</div>;
    }

    return (
        <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight">System Control Panel</h2>
                <p className="text-slate-500">Global configuration and infrastructure orchestration.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Smartphone className="h-5 w-5 text-green-600" />
                            WhatsApp Gateway
                        </CardTitle>
                        <CardDescription>Configure the primary communication channel.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="api-key">WhatsApp API Key</Label>
                            <Input id="api-key" type="password" value="************************" readOnly />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Webhook Status</Label>
                                <p className="text-xs text-slate-500">Receiving delivery receipts.</p>
                            </div>
                            <Switch checked={true} />
                        </div>
                        <Button className="w-full">Test Connection</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                            Security Policies
                        </CardTitle>
                        <CardDescription>Enterprise-level authentication rules.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Enforce MFA</Label>
                                <p className="text-xs text-slate-500">Require all officers to use 2FA.</p>
                            </div>
                            <Switch checked={true} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Session Timeout</Label>
                                <p className="text-xs text-slate-500">Auto-logout after 15 mins of inactivity.</p>
                            </div>
                            <Switch checked={true} />
                        </div>
                        <div className="grid gap-2">
                            <Label>IP Whitelisting</Label>
                            <Input placeholder="10.0.0.0/24, 192.168.1.1" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="h-5 w-5 text-blue-500" />
                            Notification Templates
                        </CardTitle>
                        <CardDescription>Manage automated client communications.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <div className="p-3 rounded-lg border bg-slate-50 flex justify-between items-center dark:bg-slate-900">
                            <span>Welcome Onboarding</span>
                            <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                        <div className="p-3 rounded-lg border bg-slate-50 flex justify-between items-center dark:bg-slate-900">
                            <span>Approval Confirmation</span>
                            <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                        <div className="p-3 rounded-lg border bg-slate-50 flex justify-between items-center dark:bg-slate-900">
                            <span>Document Request</span>
                            <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                        <Button variant="outline" className="w-full mt-2">Add Template</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Server className="h-5 w-5 text-slate-700" />
                            System Health Metrics
                        </CardTitle>
                        <CardDescription>Real-time infrastructure performance.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Cpu className="h-4 w-4 text-slate-400" />
                                <span className="text-sm">CPU Utilization</span>
                            </div>
                            <span className="text-sm font-bold">12.5%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Memory className="h-4 w-4 text-slate-400" />
                                <span className="text-sm">Memory Load</span>
                            </div>
                            <span className="text-sm font-bold">45.8%</span>
                        </div>
                        <div className="flex items-center justify-between text-green-600">
                            <div className="flex items-center gap-2 font-semibold">
                                <Globe className="h-4 w-4" />
                                <span className="text-sm">Global CDN Status</span>
                            </div>
                            <span className="text-sm">Active</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
