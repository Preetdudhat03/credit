"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

import { ApplicationData } from "@/lib/api";


// ✅ FIX: use z.number() instead of z.coerce.number()
const formSchema = z.object({
    monthly_income: z.number().min(0, "Income must be positive"),
    monthly_expenses: z.number().min(0, "Expenses must be positive"),
    bank_balance: z.number().min(0, "Balance must be positive"),
    emi_amount: z.number().min(0, "EMI must be positive"),
    late_payments_count: z.number().min(0, "Must be non-negative"),
    transaction_frequency: z.number().min(0, "Must be non-negative"),
});


type FormValues = z.infer<typeof formSchema>;


interface ApplicantFormProps {
    defaultValues: ApplicationData;
    onSubmit: (data: ApplicationData) => void;
    isLoading: boolean;
}


export function ApplicantForm({
    defaultValues,
    onSubmit,
    isLoading,
}: ApplicantFormProps) {

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),

        defaultValues: {
            monthly_income: defaultValues?.monthly_income ?? 0,
            monthly_expenses: defaultValues?.monthly_expenses ?? 0,
            bank_balance: defaultValues?.bank_balance ?? 0,
            emi_amount: defaultValues?.emi_amount ?? 0,
            late_payments_count: defaultValues?.late_payments_count ?? 0,
            transaction_frequency: defaultValues?.transaction_frequency ?? 0,
        },
    });


    function handleSubmit(values: FormValues) {
        onSubmit(values);
    }


    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >

                <FormField
                    control={form.control}
                    name="monthly_income"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Monthly Income</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(e.target.valueAsNumber)
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="monthly_expenses"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Monthly Expenses</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(e.target.valueAsNumber)
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="bank_balance"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bank Balance</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(e.target.valueAsNumber)
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="emi_amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>EMI Amount</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(e.target.valueAsNumber)
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="late_payments_count"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Late Payments Count</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(e.target.valueAsNumber)
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="transaction_frequency"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Transaction Frequency</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(e.target.valueAsNumber)
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Submit Application
                </Button>

            </form>
        </Form>
    );
}