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

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function mergeDateAndTimeToISO(date: string, time: string): string {
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

function formatTimeFromISO(isoString: string): string {
  if (!isoString) return '';
  const date = new Date(isoString);

  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
}


function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB');
}


function formatTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function formatNumberWithCommas(value: number | string): string {
  if (value === '' || value === null || value === undefined) return '';
  const num = typeof value === 'number' ? value : parseFloat(value.replace(/,/g, ''));
  if (isNaN(num)) return '';
  return num.toLocaleString();
}

export { formatDate, formatNumberWithCommas, formatTime, formatTimeFromISO, getGreeting, useDebounce, validateEmail, validatePassword };

export function passwordStrength(password: string) {
  let score = 0;
  let label = 'Very Weak';

  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  switch (score) {
    case 5:
      label = 'Strong';
      break;
    case 4:
      label = 'Good';
      break;
    case 3:
      label = 'Medium';
      break;
    case 2:
      label = 'Weak';
      break;
    default:
      label = 'Very Weak';
  }

  return { score, label };
}

