import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface OnboardingData {
  email: string;
  serviceType: 'SERVICE_PROVIDER' | 'SERVICE_SEEKER' | null;
  personalDetails: {
    firstName: string;
    lastName: string;
    country: string;
  };
  security: {
    password: string;
    confirmPassword: string;
  };
  termsAccepted: boolean;
}

interface OnboardingState {
  data: OnboardingData;
  setEmail: (email: string) => void;
  setServiceType: (type: 'SERVICE_PROVIDER' | 'SERVICE_SEEKER' | null) => void;
  setPersonalDetails: (details: Partial<OnboardingData['personalDetails']>) => void;
  setSecurity: (security: Partial<OnboardingData['security']>) => void;
  setTermsAccepted: (accepted: boolean) => void;
  resetOnboarding: () => void;
  getFullData: () => OnboardingData;
}

const initialData: OnboardingData = {
  email: '',
  serviceType: null,
  personalDetails: {
    firstName: '',
    lastName: '',
    country: '',
  },
  security: {
    password: '',
    confirmPassword: '',
  },
  termsAccepted: false,
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      data: initialData,

      setEmail: (email: string) =>
        set((state) => ({
          data: { ...state.data, email }
        })),

      setServiceType: (serviceType: 'SERVICE_PROVIDER' | 'SERVICE_SEEKER' | null) =>
        set((state) => ({
          data: { ...state.data, serviceType }
        })),

      setPersonalDetails: (details: Partial<OnboardingData['personalDetails']>) =>
        set((state) => ({
          data: {
            ...state.data,
            personalDetails: { ...state.data.personalDetails, ...details }
          }
        })),

      setSecurity: (security: Partial<OnboardingData['security']>) =>
        set((state) => ({
          data: {
            ...state.data,
            security: { ...state.data.security, ...security }
          }
        })),

      setTermsAccepted: (termsAccepted: boolean) =>
        set((state) => ({
          data: { ...state.data, termsAccepted }
        })),

      resetOnboarding: () =>
        set({ data: initialData }),

      getFullData: () => get().data,
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
) 