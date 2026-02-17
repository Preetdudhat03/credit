import { Badge } from '@/components/ui/badge';

interface RiskBadgeProps {
    level: string;
}

export function RiskBadge({ level }: RiskBadgeProps) {
    const getBadgeVariant = (lvl: string) => {
        switch (lvl.toLowerCase()) {
            case 'low':
                return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/10 dark:text-green-400 dark:border-green-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/10 dark:text-yellow-400 dark:border-yellow-800';
            case 'high':
                return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/10 dark:text-orange-400 dark:border-orange-800';
            case 'critical':
                return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/10 dark:text-red-400 dark:border-red-800';
            default:
                return 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-900/10 dark:text-slate-400 dark:border-slate-800';
        }
    };

    return (
        <Badge
            variant="outline"
            className={`px-3 py-1 font-semibold uppercase tracking-wide rounded-md border text-xs ${getBadgeVariant(level)}`}
        >
            {level}
        </Badge>
    );
}
