import { Href } from "expo-router";

interface SlideItem {
  image: any;
  id: string;
}

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

type FormData = {
  serviceType: 'provider' | 'seeker' | null;
  personalDetails: {
    firstName: string;
    lastName: string;
  };
  security: {
    password: string;
    confirmPassword: string;
  };
  termsAccepted: boolean;
}

interface SettingItem {
  id: string
  title: string
  href: Href
}

type VerificationPayload = {
  otp: string;
  requestId: string | null;
};

type SignUpPayload = {
  firstName: string;
  lastName: string;
  password: string;
  agreeTermsOfReference: string;
  deviceId: string;
  userRole: string;
};

type SignInPayload = {
  email: string;
  password: string;
};

export type { AuthHeaderProps, SlideItem, FormData, SettingItem, VerificationPayload, SignUpPayload, SignInPayload };