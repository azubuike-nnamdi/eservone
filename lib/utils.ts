import { type ClassValue, clsx } from "clsx";
import Constants from 'expo-constants';
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get the app version information
 * @returns Object containing version and build number
 */
export const getAppVersion = () => {
  const manifest = Constants.expoConfig;
  return {
    version: manifest?.version || '1.0.0',
    buildNumber: manifest?.ios?.buildNumber || manifest?.android?.versionCode || '1',
    fullVersion: `${manifest?.version || '1.0.0'} (${manifest?.ios?.buildNumber || manifest?.android?.versionCode || '1'})`
  };
}; 