import { create } from 'zustand'

interface ServiceCreationState {
  currentStep: number
  serviceName: string
  serviceCategory: string | number | null
  serviceDescription: string
  deliveryType: {
    walkIn: boolean
    homeService: boolean
  }
  minFee: number | null
  maxFee: number | null
  images: string[] // Array of image URIs

  // Actions
  setStep: (step: number) => void
  setField: (field: keyof Omit<ServiceCreationState, 'currentStep' | 'actions'>, value: any) => void
  setDeliveryType: (type: keyof ServiceCreationState['deliveryType'], value: boolean) => void
  addImage: (uri: string) => void
  removeImage: (uri: string) => void
  reset: () => void
}

const initialState = {
  currentStep: 1,
  serviceName: '',
  serviceCategory: null,
  serviceDescription: '',
  deliveryType: {
    walkIn: false,
    homeService: false,
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

  addImage: (uri) => set((state) => {
    if (state.images.length < 4 && !state.images.includes(uri)) {
      return { images: [...state.images, uri] };
    }
    return state; // No change if max reached or image already exists
  }),

  removeImage: (uri) => set((state) => ({
    images: state.images.filter((img) => img !== uri),
  })),

  reset: () => set(initialState),
})) 