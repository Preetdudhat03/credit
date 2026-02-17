"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/lib/auth-store';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;
    return (
        <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-auto bg-slate-50/50 p-6 dark:bg-slate-900/50">
                    {children}
                </main>
            </div>
        </div>
    );
}
