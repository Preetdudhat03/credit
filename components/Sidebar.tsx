"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    UserPlus,
    FileText,
    CheckCircle,
    ShieldAlert,
    BarChart3,
    Settings,
    HelpCircle,
    User,
    LogOut,
    ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/lib/auth-store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const navItems = [
        { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, roles: ['client', 'loan_officer', 'risk_manager', 'admin'] },
        { href: '/application/new', label: 'New Application', icon: UserPlus, roles: ['client', 'loan_officer'] },
        { href: '/application/list', label: 'Applications', icon: CheckCircle, roles: ['loan_officer', 'risk_manager'] },
        { href: '/analytics', label: 'Risk Analytics', icon: BarChart3, roles: ['risk_manager'] },
        { href: '/admin/system', label: 'System Control', icon: Settings, roles: ['admin'] },
        { href: '/admin/users', label: 'User Management', icon: User, roles: ['admin'] },
    ];

    const secondaryItems = [
        { href: '/profile', label: 'My Profile', icon: User, roles: ['client', 'loan_officer', 'risk_manager', 'admin'] },
        { href: '/settings', label: 'Settings', icon: Settings, roles: ['client', 'loan_officer', 'risk_manager'] },
        { href: '/support', label: 'Support', icon: HelpCircle, roles: ['client', 'loan_officer', 'risk_manager', 'admin'] },
    ];

    const filteredNavItems = navItems.filter(item =>
        !user || item.roles.includes(user.role)
    );

    const filteredSecondaryItems = secondaryItems.filter(item =>
        !user || item.roles.includes(user.role)
    );

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-slate-50/50 backdrop-blur supports-[backdrop-filter]:bg-slate-50/50 dark:bg-slate-950/50 shadow-sm z-20">
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold group">
                    <div className="bg-primary p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                        <ShieldAlert className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50">TrustScoreAI</span>
                </Link>
            </div>

            <div className="flex-1 overflow-auto py-4">
                <div className="px-4 mb-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3">Main Menu</p>
                </div>
                <nav className="grid items-start px-3 text-sm font-medium gap-1">
                    {filteredNavItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 group",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90"
                                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50"
                                )}
                            >
                                <Icon className={cn("h-4 w-4", isActive ? "text-primary-foreground" : "group-hover:text-primary transition-colors")} />
                                {item.label}
                                {isActive && <ChevronRight className="ml-auto h-3 w-3 opacity-50" />}
                            </Link>
                        );
                    })}
                </nav>

                <Separator className="my-6 mx-4 opacity-50" />

                <div className="px-4 mb-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3">Preferences</p>
                </div>
                <nav className="grid items-start px-3 text-sm font-medium gap-1">
                    {filteredSecondaryItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200",
                                    isActive
                                        ? "bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-50"
                                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-8 px-6">
                    <div className="p-3 bg-slate-100/50 rounded-xl border border-slate-200 dark:bg-slate-900/50 dark:border-slate-800">
                        <div className="flex items-center gap-2 text-[11px] text-green-600 font-semibold mb-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                            API OPERATIONAL
                        </div>
                        <div className="text-[10px] text-slate-400">
                            V2.4.1 Production Cluster
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t p-4 bg-slate-50/80 dark:bg-slate-950/80">
                <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
                    <Avatar className="h-9 w-9 border border-slate-100 dark:border-slate-700">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                            {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-1 flex-col overflow-hidden">
                        <span className="text-sm font-bold truncate text-slate-900 dark:text-slate-50">{user?.name || 'Guest User'}</span>
                        <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-tighter">
                            {user?.role?.replace('_', ' ') || 'Visitor'}
                        </span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500 transition-colors" onClick={handleLogout}>
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
