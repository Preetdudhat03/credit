"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ApplicationData } from '@/lib/api';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const formSchema = z.object({
    monthly_income: z.coerce.number().min(0, "Income must be positive"),
    monthly_expenses: z.coerce.number().min(0, "Expenses must be positive"),
    bank_balance: z.coerce.number().min(0, "Balance must be positive"),
    emi_amount: z.coerce.number().min(0, "EMI must be positive"),
    late_payments_count: z.coerce.number().min(0, "Must be non-negative"),
    transaction_frequency: z.coerce.number().min(0, "Must be non-negative"),
});

interface ApplicantFormProps {
    defaultValues: ApplicationData;
    onSubmit: (data: ApplicationData) => void;
    isLoading: boolean;
}

export function ApplicantForm({ defaultValues, onSubmit, isLoading }: ApplicantFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    function handleSubmit(values: z.infer<typeof formSchema>) {
        onSubmit(values);
    }

    function handleReset() {
        form.reset(defaultValues);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="monthly_income"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Monthly Income</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="50000" {...field} />
                                </FormControl>
                                <FormDescription>Total monthly income from all sources.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="monthly_expenses"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Monthly Expenses</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="20000" {...field} />
                                </FormControl>
                                <FormDescription>Estimated monthly living costs.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bank_balance"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Current Bank Balance</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="150000" {...field} />
                                </FormControl>
                                <FormDescription>Total savings in primary account.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="emi_amount"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Current EMI Obligations</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="5000" {...field} />
                                </FormControl>
                                <FormDescription>Total existing monthly EMI payments.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="late_payments_count"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Late Payments (Last 12mo)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="0" {...field} />
                                </FormControl>
                                <FormDescription>Number of missed or late payments.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="transaction_frequency"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Avg Transactions / Month</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="120" {...field} />
                                </FormControl>
                                <FormDescription>Average number of bank transactions.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-4 pt-4 border-t">
                    <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Calculate TrustScore
                    </Button>
                    <Button type="button" variant="outline" onClick={handleReset} disabled={isLoading} className="w-full md:w-auto">
                        Reset Form
                    </Button>
                </div>
            </form>
        </Form>
    );
}
