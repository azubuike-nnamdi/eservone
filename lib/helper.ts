import { useEffect } from "react";

import * as FileSystem from 'expo-file-system';
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
    return 'Good evening';
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


export function getProfileImageUri(base64String?: string): string | undefined {
  if (!base64String) return undefined;
  // Remove leading/trailing quotes or apostrophes
  const clean = base64String.replace(/^['"]+|['"]+$/g, "");
  // Add prefix if not present
  if (!clean.startsWith("data:image")) {
    return `data:image/jpeg;base64,${clean}`;
  }
  return clean;
}

export const maskAccountNumber = (accountNumber: string) => {
  if (accountNumber.length < 5) return accountNumber;
  const firstTwo = accountNumber.slice(0, 2);
  const lastThree = accountNumber.slice(-3);
  const masked = '*'.repeat(accountNumber.length - 5);
  return `${firstTwo}${masked}${lastThree}`;
};

/**
 * Determines the delivery type display text based on homeService and walkInService values
 * @param homeService - Whether home service is available
 * @param walkInService - Whether walk-in service is available
 * @returns The delivery type display string or null if both are false
 */
export const getDeliveryTypeDisplay = (homeService?: boolean, walkInService?: boolean): string | null => {
  if (homeService && walkInService) {
    return "Home Service/Walk In Service";
  } else if (homeService) {
    return "Home Service";
  } else if (walkInService) {
    return "Walk In Service";
  }
  return null; // Don't show anything if both are false
};



// Helper to convert file URI to base64
export const convertImageToBase64 = async (fileUri: string) => {
  try {
    const base64Data = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64Data;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return null;
  }
};

// Helper to validate file type
export const isValidImageType = (uri: string): boolean => {
  const extension = uri.split('.').pop()?.toLowerCase();
  return extension === 'jpg' || extension === 'jpeg' || extension === 'png';
};

// Helper to calculate base64 size in bytes
export const getBase64SizeInBytes = (base64: string): number => {
  // Remove data URL prefix if present
  const base64Data = base64.replace(/^data:image\/[a-z]+;base64,/, '');
  // Calculate size: base64 is 4/3 the size of the original binary data
  return (base64Data.length * 3) / 4;
};

// Helper to format bytes to MB
export const formatBytesToMB = (bytes: number): number => {
  return Math.round((bytes / (1024 * 1024)) * 100) / 100;
};