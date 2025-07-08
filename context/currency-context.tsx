import useGetUserProfileDetails from '@/hooks/query/useGetUserProfileDetails';
import React, { createContext, useContext, useMemo } from 'react';

const countryToCurrency: Record<string, string> = {
  'Nigeria': 'NGN',
  'Canada': 'CAD',
  'United States': 'USD',
  'United Kingdom': 'GBP',
  'France': 'EUR',
  'Germany': 'EUR',
  'Australia': 'AUD',
  'Japan': 'JPY',
  // ...add more as needed
};

const currencySymbols: Record<string, string> = {
  'USD': '$',
  'CAD': 'C$',
  'GBP': '£',
  'NGN': '₦',
  'EUR': '€',
  'JPY': '¥',
  'AUD': 'A$',
  'CHF': 'CHF',
  'CNY': '¥',
  'INR': '₹',
};

type CurrencyContextType = {
  country: string | undefined;
  currency: string;
  symbol: string;
  format: (value: number) => string;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: userProfileDetails } = useGetUserProfileDetails();
  const country = userProfileDetails?.data?.country;
  const currency = country ? countryToCurrency[country] ?? '' : ''
  const symbol = currencySymbols[currency] ?? currency;

  const format = (value: number) =>
    `${symbol}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const value = useMemo(() => ({ country, currency, symbol, format }), [country, currency, symbol]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within a CurrencyProvider');
  return ctx;
} 