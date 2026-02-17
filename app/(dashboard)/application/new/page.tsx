"use client";

import { useAppStore } from '@/lib/store';
import { ApplicantForm } from '@/components/ApplicantForm';
import { predictCreditScore } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


export default function NewApplicationPage() {
    const { applicationData, setApplicationData, setResult, setIsLoading, isLoading } = useAppStore();
    const router = useRouter();
    // const { toast } = useToast(); 

    const handleSubmit = async (data: any) => {
        setIsLoading(true);
        setApplicationData(data);
        try {
            const result = await predictCreditScore(data);
            setResult(result);
            router.push('/application/result');
        } catch (error) {
            console.error("Error calculating score:", error);
            // toast({ title: "Error", description: "Failed to calculate score. Please try again.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-start min-h-[calc(100vh-100px)] animate-in fade-in slide-in-from-bottom-5 duration-500">
            <Card className="w-full max-w-2xl shadow-lg border-t-4 border-t-blue-600">
                <CardHeader>
                    <CardTitle className="text-2xl">New Credit Application</CardTitle>
                    <CardDescription>
                        Enter applicant's financial details to generate a TrustScoreAI report.
                        All fields are required for accurate analysis.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ApplicantForm
                        defaultValues={applicationData}
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
