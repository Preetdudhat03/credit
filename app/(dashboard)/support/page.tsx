"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { HelpCircle, MessageSquare, Book, FileText, ExternalLink, LifeBuoy } from 'lucide-react';

export default function SupportPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Support Center</h1>
                <p className="text-slate-500">How can we help you today with TrustScoreAI?</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Contact Form */}
                <Card className="md:col-span-2 shadow-sm border-t-4 border-t-primary">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-primary" />
                            Open a Support Ticket
                        </CardTitle>
                        <CardDescription>Our technical team typically responds within 4-6 business hours.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" placeholder="e.g. Question about Score Explanation" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Input id="category" placeholder="Technical Support" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Describe your issue in detail..." className="min-h-[150px]" />
                        </div>
                        <Button className="w-full">Submit Ticket</Button>
                    </CardContent>
                </Card>

                {/* Support Resources */}
                <div className="space-y-6">
                    <Card className="shadow-sm">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Book className="h-4 w-4 text-blue-500" />
                                Documentation
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="ghost" className="w-full justify-start text-sm hover:text-blue-600">
                                API Reference <ExternalLink className="ml-auto h-3 w-3" />
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-sm hover:text-blue-600">
                                Scoring Methodology <ExternalLink className="ml-auto h-3 w-3" />
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-sm hover:text-blue-600">
                                Integration Guide <ExternalLink className="ml-auto h-3 w-3" />
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm bg-slate-50 dark:bg-slate-900 border-none">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                                <LifeBuoy className="h-4 w-4 text-slate-500" />
                                Quick Links
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-3 bg-white rounded-lg border dark:bg-slate-950 flex items-center gap-3">
                                <FileText className="h-4 w-4 text-slate-400" />
                                <span className="text-xs font-medium">System Status</span>
                                <div className="ml-auto h-2 w-2 rounded-full bg-green-500" />
                            </div>
                            <div className="p-3 bg-white rounded-lg border dark:bg-slate-950 flex items-center gap-3">
                                <HelpCircle className="h-4 w-4 text-slate-400" />
                                <span className="text-xs font-medium">Common FAQs</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
