import { create } from 'zustand'

interface ServiceCreationState {
  currentStep: number
  serviceName: string
  serviceCategory: string | number | null
  serviceDescription: string
  serviceAddress: string
  deliveryType: {
    walkIn: boolean
    homeService: boolean
    virtualService: boolean
  }
  minFee: number | null
  maxFee: number | null
  images: string[] // Array of base64 image strings

  // Actions
  setStep: (step: number) => void
  setField: (field: keyof Omit<ServiceCreationState, 'currentStep' | 'actions'>, value: any) => void
  setDeliveryType: (type: keyof ServiceCreationState['deliveryType'], value: boolean) => void
  addImage: (base64: string) => void // Accept only base64
  removeImage: (base64: string) => void
  reset: () => void
}

const initialState = {
  currentStep: 1,
  serviceName: '',
  serviceCategory: null,
  serviceDescription: '',
  serviceAddress: '',
  deliveryType: {
    walkIn: false,
    homeService: false,
    virtualService: false,
  },
  minFee: null,
  maxFee: null,
  images: [],
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

  reset: () => set(initialState),
})) 