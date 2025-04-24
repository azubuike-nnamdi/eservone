import { create } from 'zustand'

interface SignupState {
  jwtToken: string | null
  setJwtToken: (token: string | null) => void
  clearJwtToken: () => void
}

export const useSignupStore = create<SignupState>((set) => ({
  jwtToken: null,
  setJwtToken: (token) => set({ jwtToken: token }),
  clearJwtToken: () => set({ jwtToken: null }),
})) 