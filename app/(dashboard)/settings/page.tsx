"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Bell, Lock, Eye, Monitor, CreditCard, ShieldCheck } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-2 pb-4 border-b">
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            </div>

            <div className="grid gap-6">
                {/* Security Section */}
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <CardTitle className="flex items-center gap-2">
                                <Lock className="h-4 w-4 text-slate-500" />
                                Security & Authentication
                            </CardTitle>
                            <CardDescription>Manage your password and Multi-Factor settings.</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">Update</Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border dark:bg-slate-900">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="h-5 w-5 text-green-600" />
                                <div>
                                    <p className="text-sm font-medium">Two-Factor Authentication</p>
                                    <p className="text-xs text-slate-500">Protect your account with an extra layer of security.</p>
                                </div>
                            </div>
                            <Badge variant="outline" className="bg-green-50 text-green-700">Enabled</Badge>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                            <span className="text-sm">Last password change</span>
                            <span className="text-sm text-slate-500">45 days ago</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Preferences Section */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Monitor className="h-4 w-4 text-slate-500" />
                            Preferences
                        </CardTitle>
                        <CardDescription>Customize your dashboard experience.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="space-y-0.5">
                                <Label>Theme Interface</Label>
                                <p className="text-xs text-slate-500">Select how you want TrustScoreAI to look.</p>
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
                        <Separator />
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="space-y-0.5">
                                <Label>Default Language</Label>
                                <p className="text-xs text-slate-500">The language used throughout the application.</p>
                            </div>
                            <Select defaultValue="en">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English (US)</SelectItem>
                                    <SelectItem value="fr">French</SelectItem>
                                    <SelectItem value="es">Spanish</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications Section */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-4 w-4 text-slate-500" />
                            Notifications
                        </CardTitle>
                        <CardDescription>Control which alerts you receive.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Score calculation alerts</span>
                            <Button variant="ghost" className="text-primary text-xs font-semibold">Enabled</Button>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Marketing emails</span>
                            <Button variant="ghost" className="text-slate-400 text-xs font-semibold">Disabled</Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="pt-6 flex justify-end gap-3">
                    <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50">Deactivate Account</Button>
                    <Button>Save All Changes</Button>
                </div>
            </div>
        </div>
    );
}

function Badge({ children, variant, className }: { children: React.ReactNode, variant?: string, className?: string }) {
    return (
        <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold border ${className}`}>
            {children}
        </span>
    );
}
