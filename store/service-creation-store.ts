import { create } from 'zustand'

interface ServiceCreationState {
  currentStep: number
  serviceName: string
  serviceCategory: string | number | null
  serviceDescription: string
  serviceAddress: string
  deliveryType: {
    homeService: boolean
    walkInService: boolean
    virtualService: boolean
  }
  minFee: number | null
  maxFee: number | null
  images: string[] // Array of base64 image strings
  showStep1Errors: boolean

  // Actions
  setStep: (step: number) => void
  setField: (field: keyof Omit<ServiceCreationState, 'currentStep' | 'actions' | 'showStep1Errors'>, value: any) => void
  setDeliveryType: (type: keyof ServiceCreationState['deliveryType'], value: boolean) => void
  addImage: (base64: string) => void // Accept only base64
  removeImage: (base64: string) => void
  reset: () => void
  validateStep1: () => { isValid: boolean; errors: string[] }
  setShowStep1Errors: (show: boolean) => void
}

const initialState = {
  currentStep: 1,
  serviceName: '',
  serviceCategory: null,
  serviceDescription: '',
  serviceAddress: '',
  deliveryType: {
    homeService: false,
    walkInService: false,
    virtualService: false,
  },
  minFee: null,
  maxFee: null,
  images: [],
  showStep1Errors: false,
}

export const useServiceCreationStore = create<ServiceCreationState>((set, get) => ({
  ...initialState,

  setStep: (step) => set({ currentStep: step }),

  setField: (field, value) => set((state) => ({ ...state, [field]: value })),

  setDeliveryType: (type, value) => set((state) => ({
    deliveryType: { ...state.deliveryType, [type]: value },
  })),

  addImage: (base64) => set((state) => {
    // Prevent adding file URIs by mistake
    if (typeof base64 !== 'string' || base64.startsWith('file:/')) {
      console.warn('Attempted to add a non-base64 image to the store. Ignored:', base64);
      return state;
    }
    if (state.images.length < 4 && !state.images.includes(base64)) {
      return { images: [...state.images, base64] };
    }
    return state; // No change if max reached or image already exists
  }),

  removeImage: (base64) => set((state) => ({
    images: state.images.filter((img) => img !== base64),
  })),

  validateStep1: () => {
    const state = get();
    const errors: string[] = [];

    if (!state.serviceName.trim()) {
      errors.push("Service name is required");
    }

    if (!state.serviceCategory) {
      errors.push("Service category is required");
    }

    if (!state.serviceDescription.trim()) {
      errors.push("Service description is required");
    }

    if (!state.serviceAddress.trim()) {
      errors.push("Service address is required");
    }

    if (!state.deliveryType.homeService && !state.deliveryType.walkInService) {
      errors.push("At least one delivery type must be selected");
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  setShowStep1Errors: (show) => set({ showStep1Errors: show }),

  reset: () => set(initialState),
})) 