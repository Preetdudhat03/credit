import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface FraudScoreCardProps {
    score: number;
}

export function FraudScoreCard({ score }: FraudScoreCardProps) {
    const getRiskColor = (s: number) => {
        if (s < 20) return 'bg-green-500';
        if (s < 50) return 'bg-yellow-500';
        if (s < 80) return 'bg-orange-500';
        return 'bg-red-500';
    };

    const riskLabel = score < 20 ? 'Safe' : score < 50 ? 'Moderate' : score < 80 ? 'High' : 'Critical';

    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium uppercase text-slate-500 tracking-wider">Fraud Probability</CardTitle>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{score}%</span>
                    <span className={`text-sm font-medium ${score < 50 ? 'text-green-600' : 'text-red-600'}`}>
                        {riskLabel} Risk
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                <Progress value={score} className={`h-2 w-full ${getRiskColor(score)}`} />
                <p className="text-xs text-slate-500 mt-2">
                    Based on anomaly detection algorithms analyzing transaction patterns and device fingerprinting.
                </p>
            </CardContent>
        </Card>
    );
}
