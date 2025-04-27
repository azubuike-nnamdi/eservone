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
  serviceType: 'SERVICE_PROVIDER' | 'SERVICE_SEEKER' | null;
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
  agreeTermsOfReference: boolean | string;
  deviceId: string | null;
  userRole: 'SERVICE_PROVIDER' | 'SERVICE_SEEKER' | null;
};

type SignInPayload = {
  emailAddress: string;
  password: string;
  deviceId: string | null;
};


// Define the user type
type User = {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  userRole: string;
};

type UserContextType = {
  user: User | null;
  saveUser: (user: User | null) => Promise<void>;
  clearUser: () => Promise<void>;
  isLoading: boolean;
};

type ForgotPasswordPayload = {
  email: string;
};

type ChangePasswordPayload = {
  newPassword: string;
  oldPassword: string;
};

type ValidateResetPasswordEmailPayload = {
  otp: string;
  requestId: string | null;
};

type ResetPasswordPayload = {
  newPassword: string;
};

type Appointment = {
  id: string
  date: string
  time: string
  serviceName: string
  location: string
  price: number
  rating?: number
}

type AppointmentType = 'upcoming' | 'history'

type AppointmentSectionProps = {
  title: string
  type: AppointmentType
  appointments: Appointment[]
  onAppointmentPress?: (appointment: Appointment) => void
}

interface AppointmentCardProps {
  type: AppointmentType
  date: string
  time: string
  serviceName: string
  location: string
  price: number
  rating?: number
  onPress?: () => void
}


interface ProfileHeaderProps {
  title: string
  showBackArrow?: boolean
  showNotification?: boolean
  onBackPress?: () => void
  onNotificationPress?: () => void
  rightComponent?: React.ReactNode
}

interface DeleteAccountModalProps {
  visible: boolean
  onClose: () => void
  onConfirm: () => void
}


interface SectionCardProps {
  title?: string;
  description?: string;
  paragraphs: string[];
}


interface ServiceType {
  key: string;
  value: string;
}

type UpdateProfilePayload = {
  homeAddress: string
  meansOfIdentification: string
  phoneNumber: string
  profilePicture: string
}

type SelectOption = {
  label: string;
  value: string | number; // Allow number values too
}

type SelectProps = {
  label?: string
  value: string | number | undefined | null // Allow undefined/null initial value
  options: SelectOption[]
  onSelect: (value: string | number) => void
  placeholder?: string
  error?: string
  containerClassName?: string
  labelClassName?: string
  selectClassName?: string
  errorClassName?: string
}

type LoadingStateProps = {
  isLoading: boolean;
  text?: string;
  className?: string;
  spinnerColor?: string;
}


type ServiceItem = {
  id: number;
  serviceName: string;
  serviceDescription: string;
  minimumPrice: number;
  maximumPrice: number;
  serviceDeliveryType: string;
  active: boolean;
  userId: number;
}

export type { Appointment, AppointmentCardProps, AppointmentSectionProps, AuthHeaderProps, ChangePasswordPayload, DeleteAccountModalProps, ForgotPasswordPayload, FormData, LoadingStateProps, ProfileHeaderProps, ResetPasswordPayload, SectionCardProps, SelectOption, SelectProps, ServiceItem, ServiceType, SettingItem, SignInPayload, SignUpPayload, SlideItem, UpdateProfilePayload, User, UserContextType, ValidateResetPasswordEmailPayload, VerificationPayload };

