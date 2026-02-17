"use client";

import { RiskManagerDashboard } from '@/components/roles/RiskManagerDashboard';
import { useAuthStore } from '@/lib/auth-store';
import { redirect } from 'next/navigation';

export default function AnalyticsPage() {
    const { user } = useAuthStore();

    if (!user || (user.role !== 'risk_manager' && user.role !== 'admin')) {
        return <div className="p-8 text-center">Unauthorized access. Risk Manager privileges required.</div>;
    }

    return <RiskManagerDashboard />;
}
