import { create } from 'zustand';
import { CreditScoreResponse, ApplicationData } from './api';

interface AppStore {
    applicationData: ApplicationData;
    setApplicationData: (data: ApplicationData) => void;
    result: CreditScoreResponse | null;
    setResult: (result: CreditScoreResponse) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
    applicationData: {
        monthly_income: 50000,
        monthly_expenses: 20000,
        bank_balance: 150000,
        emi_amount: 5000,
        late_payments_count: 0,
        transaction_frequency: 120
    },
    setApplicationData: (data) => set({ applicationData: data }),
    result: null,
    setResult: (result) => set({ result }),
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading }),
}));
