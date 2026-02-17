"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ShieldAlert, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore, UserRole } from '@/lib/auth-store';

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState<UserRole>('client');
    const router = useRouter();
    const { login } = useAuthStore();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "preet@credit.com",
            password: "preet123",
        },
    });

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        setIsLoading(true);

        // Simulate API call with specific demo credentials check
        setTimeout(() => {
            if (values.email === "preet@credit.com" && values.password === "preet123") {
                login({
                    id: "1",
                    name: "Preet",
                    email: values.email,
                    role: role, // Role is still determined by the active tab
                    department: role !== 'client' ? "Credit Intelligence Unit" : undefined,
                });
                setIsLoading(false);
                router.push('/dashboard');
            } else {
                setIsLoading(false);
                form.setError("root", { message: "Invalid demo credentials. Please use preet@credit.com / preet123" });
            }
        }, 1200);
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col items-center mb-8">
                <div className="bg-primary p-3 rounded-xl mb-4">
                    <ShieldAlert className="h-8 w-8 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">Welcome to TrustScoreAI</h1>
                <p className="text-slate-500 text-sm">Secure Alternate Credit Scoring System</p>
            </div>

            <Card className="border-slate-200 shadow-xl overflow-hidden">
                <CardHeader className="bg-slate-50 pb-8 dark:bg-slate-900">
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>
                        Enter your credentials to access your secure dashboard.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <Tabs defaultValue="client" className="w-full mb-6" onValueChange={(v) => setRole(v as UserRole)}>
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="client">Client</TabsTrigger>
                            <TabsTrigger value="loan_officer">Officer</TabsTrigger>
                            <TabsTrigger value="risk_manager">Manager</TabsTrigger>
                            <TabsTrigger value="admin">Admin</TabsTrigger>
                        </TabsList>
                        <TabsContent value="loan_officer" className="mt-4">
                            <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg dark:bg-blue-900/20 dark:border-blue-800">
                                <p className="text-xs text-blue-700 dark:text-blue-300">
                                    Loan Officers can process applications and view scoring explanations.
                                </p>
                            </div>
                        </TabsContent>
                        <TabsContent value="risk_manager" className="mt-4">
                            <div className="p-3 bg-purple-50 border border-purple-100 rounded-lg dark:bg-purple-900/20 dark:border-purple-800">
                                <p className="text-xs text-purple-700 dark:text-purple-300">
                                    Risk Managers monitor aggregate data and adjust system thresholds.
                                </p>
                            </div>
                        </TabsContent>
                        <TabsContent value="admin" className="mt-4">
                            <div className="p-3 bg-orange-50 border border-orange-100 rounded-lg dark:bg-orange-900/20 dark:border-orange-800">
                                <p className="text-xs text-orange-700 dark:text-orange-300">
                                    Administrators manage system configuration and security logs.
                                </p>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="name@company.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {form.formState.errors.root && (
                                <div className="p-2 mb-4 text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded">
                                    {form.formState.errors.root.message}
                                </div>
                            )}
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Sign In
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 border-t px-6 py-4 bg-slate-50 dark:bg-slate-900">
                    <div className="text-sm text-center text-slate-500">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="text-primary font-semibold hover:underline">
                            Create account
                        </Link>
                    </div>
                </CardFooter>
            </Card>

            <div className="mt-8 text-center">
                <p className="text-xs text-slate-400">
                    &copy; 2026 TrustScoreAI. Enterprise grade financial security.
                </p>
            </div>
        </div>
    );
}
