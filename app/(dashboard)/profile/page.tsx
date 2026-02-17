"use client";

import { useAuthStore } from '@/lib/auth-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Shield, Mail, User, Phone, MapPin, Building } from 'lucide-react';

export default function ProfilePage() {
    const { user } = useAuthStore();

    if (!user) return null;

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Account Profile</h1>
                    <p className="text-slate-500">Manage your personal information and account security.</p>
                </div>
                <Button>Save Changes</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Profile Info Sidebar */}
                <Card className="md:col-span-1 shadow-md">
                    <CardContent className="pt-8 flex flex-col items-center">
                        <Avatar className="h-24 w-24 mb-4 border-4 border-slate-50 shadow-sm">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="text-2xl bg-primary text-primary-foreground font-bold">
                                {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                        <h2 className="text-xl font-bold">{user.name}</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 capitalize">
                                {user.role.replace('_', ' ')}
                            </Badge>
                        </div>
                        <p className="text-sm text-slate-500 mt-4 text-center px-4">
                            Member since February 2026. Consistent account activity detected.
                        </p>
                    </CardContent>
                </Card>

                {/* Detailed Form */}
                <Card className="md:col-span-2 shadow-sm">
                    <CardHeader>
                        <CardTitle>Personal Details</CardTitle>
                        <CardDescription>Update your contact information and public profile.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="full-name">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                    <Input id="full-name" defaultValue={user.name} className="pl-9" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                    <Input id="email" defaultValue={user.email} className="pl-9" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <div className="relative">
                                    <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                    <Input id="phone" defaultValue="+1 (555) 000-0000" className="pl-9" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                    <Input id="location" defaultValue="New York, USA" className="pl-9" />
                                </div>
                            </div>
                        </div>

                        {user.role !== 'client' && (
                            <div className="space-y-2 pt-4 border-t">
                                <Label>Work Information</Label>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="relative">
                                        <Building className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                        <Input defaultValue={user.department} className="pl-9" placeholder="Department" />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="pt-6 border-t flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm font-medium">
                                    <Shield className="h-4 w-4 text-green-600" />
                                    ID Verification
                                </div>
                                <Badge variant="outline" className="text-green-600 border-green-200">Verified</Badge>
                            </div>
                            <p className="text-xs text-slate-500">
                                Your identity has been verified using government-issued documents. This helps in providing accurate TrustScore assessments.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
