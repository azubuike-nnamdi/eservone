import { Country, CurrencyStore } from '@/constants/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

// Currency symbols mapping
const CURRENCY_SYMBOLS: Record<string, string> = {
  'USD': '$',
  'CAD': 'C$',
  'GBP': '£',
  'NGN': '₦',
  'EUR': '€',
  'JPY': '¥',
  'AUD': 'A$',
  'CHF': 'CHF',
  'CNY': '¥',
  'INR': '₹'
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      selectedCountry: null,
      availableCountries: [],

      setSelectedCountry: (country: Country) => {
        set({ selectedCountry: country })
      },

      setAvailableCountries: (countries: Country[]) => {
        set({ availableCountries: countries })
      },

      getCountryByCurrency: (currency: string) => {
        const { availableCountries } = get()
        return availableCountries.find(c => c.currency === currency)
      },

      formatCurrency: (amount: number, currency?: string) => {
        const { selectedCountry } = get()
        const targetCurrency = currency || selectedCountry?.currency || 'USD'
        const symbol = CURRENCY_SYMBOLS[targetCurrency] || targetCurrency

        if (!symbol) {
          return `${amount.toFixed(2)}`
        }

        // Format based on currency
        switch (targetCurrency) {
          case 'NGN':
            return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          case 'JPY':
            return `${symbol}${amount.toFixed(0)}`
          default:
            return `${symbol}${amount.toFixed(2)}`
        }
      }
    }),
    {
      name: 'currency-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
) 