import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ExplanationPanelProps {
    positiveFactors: string[];
    negativeFactors: string[];
}

export function ExplanationPanel({ positiveFactors, negativeFactors }: ExplanationPanelProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-l-4 border-l-green-500 shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold text-green-700 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5" />
                        Positive Factors
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {positiveFactors.map((factor, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
                                {factor}
                            </li>
                        ))}
                        {positiveFactors.length === 0 && (
                            <li className="text-sm text-slate-400 italic">No significant positive factors detected.</li>
                        )}
                    </ul>
                </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500 shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold text-red-700 flex items-center gap-2">
                        <XCircle className="h-5 w-5" />
                        Negative Factors
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {negativeFactors.map((factor, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                                {factor}
                            </li>
                        ))}
                        {negativeFactors.length === 0 && (
                            <li className="text-sm text-slate-400 italic">No significant negative factors detected.</li>
                        )}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
