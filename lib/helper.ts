import { useEffect } from "react";

import { useState } from "react";

const validateEmail = (text: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(text);
};

const getGreeting = (): string => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return 'Good morning';
  } else if (hour >= 12 && hour < 17) {
    return 'Good afternoon';
  } else if (hour >= 17 && hour < 21) {
    return 'Good evening';
  } else {
    return 'Good night';
  }
};

const validatePassword = (pass: string) => {
  const hasMinLength = pass.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(pass);
  const hasNumber = /\d/.test(pass);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
  return hasMinLength && hasLetter && hasNumber && hasSymbol;
};

const formatCurrency = (value: number | null | undefined) => {
  if (value === null || value === undefined) return '$0.00';
  return `$${value.toFixed(2)}`;
};

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

function mergeDateAndTimeToISO(date: string, time: string): string {
  if (!date || !time) return '';
  let hour = 0, minute = 0;
  let timeString = time.trim().toLowerCase();
  if (timeString.includes('am') || timeString.includes('pm')) {
    // 12-hour format
    const [rawHour, rawMinute] = timeString.replace(/am|pm/, '').trim().split(':');
    hour = parseInt(rawHour, 10);
    minute = parseInt(rawMinute || '0', 10);
    if (timeString.includes('pm') && hour < 12) hour += 12;
    if (timeString.includes('am') && hour === 12) hour = 0;
  } else {
    // 24-hour format
    [hour, minute] = timeString.split(':').map(Number);
  }
  const dateObj = new Date(date);
  dateObj.setHours(hour, minute, 0, 0);
  return dateObj.toISOString();
}

export { formatCurrency, getGreeting, mergeDateAndTimeToISO, useDebounce, validateEmail, validatePassword };

