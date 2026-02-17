"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Bell, Lock, Eye, Monitor, CreditCard, ShieldCheck } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuthStore } from '@/lib/auth-store';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

export default function SettingsPage() {
    const { user } = useAuthStore();

    if (!user) return null;

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 pb-10">
            <div className="flex items-center gap-2 pb-4 border-b">
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            </div>

            <div className="grid gap-6">
                {/* Profile Section - Common for all */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Monitor className="h-4 w-4 text-slate-500" />
                            General Preferences
                        </CardTitle>
                        <CardDescription>Update your basic account preferences and theme.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="space-y-0.5">
                                <Label>Display Theme</Label>
                                <p className="text-xs text-slate-500">Choose between light, dark or system.</p>
                            </div>
                            <Select defaultValue="system">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Light Mode</SelectItem>
                                    <SelectItem value="dark">Dark Mode</SelectItem>
                                    <SelectItem value="system">System Default</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Risk Manager Specific Settings */}
                {user.role === 'risk_manager' && (
                    <>
                        <Card className="border-l-4 border-l-red-500">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-red-700">
                                    <ShieldCheck className="h-5 w-5" /> Risk Threshold Control
                                </CardTitle>
                                <CardDescription>Adjust the AI decision boundary for automatic approvals/rejections.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <Label>Approval Threshold (Credit Score)</Label>
                                        <span className="font-bold text-green-600">750+</span>
                                    </div>
                                    <Slider defaultValue={[750]} max={900} min={300} step={10} />
                                    <p className="text-[10px] text-slate-500 italic">Applications above this score will be auto-flagged for approval.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <Label>Rejection Threshold (Fraud Score)</Label>
                                        <span className="font-bold text-red-600">85%+</span>
                                    </div>
                                    <Slider defaultValue={[85]} max={100} min={0} step={5} />
                                    <p className="text-[10px] text-slate-500 italic">Applications above this fraud probability will be auto-rejected.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}

                {/* Admin Specific Settings (Quick Access) */}
                {user.role === 'admin' && (
                    <Card className="border-l-4 border-l-primary">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lock className="h-5 w-5" /> System Security Policy
                            </CardTitle>
                            <CardDescription>Global authentication and session management.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Mandatory MFA</Label>
                                    <p className="text-xs text-slate-500">All bank staff must Use 2FA.</p>
                                </div>
                                <Switch checked={true} />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Concurrent Session Limit</Label>
                                    <p className="text-xs text-slate-500">Maximum active sessions per user.</p>
                                </div>
                                <Badge variant="outline">2 Sessions</Badge>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Notifications - All roles */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-4 w-4 text-slate-500" />
                            Notifications & Alerts
                        </CardTitle>
                        <CardDescription>Manage how you receive updates.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Email digest (Daily)</span>
                            <Switch checked={true} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <span className="text-sm">In-app critical alerts</span>
                            <Switch checked={true} />
                        </div>
                    </CardContent>
                </Card>

                <div className="pt-6 flex justify-end gap-3">
                    <Button variant="ghost">Discard</Button>
                    <Button className="bg-primary hover:bg-primary/90">Apply Changes</Button>
                </div>
            </div>
        </div>
    );
}
