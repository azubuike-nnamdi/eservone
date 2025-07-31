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
  country?: string;
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
  country?: string;
  currency?: string;
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
  id: number
  serviceName: string
  appointmentDate: string
  address: string | null
  costOfService: string
  upfrontPayment: string
  buzzCode: string
  additionalDetails: string
  hasPet: boolean
  serviceId: number | null
  price: number | null
  userId: string
  serviceStatus: 'PENDING' | 'COMPLETED' | 'CANCELED'
  serviceAppointmentStatus: 'PENDING' | 'ACCEPT' | 'DECLINED'
  chatRoomId: string | null
  userEmail: string | null
  latitude: string | null
  longitude: string | null
  serviceProviderEmail: string | null
  paymentStatus?: 'SUCCESSFUL' | 'FAILED' | 'PENDING'
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
  appointment: Appointment
  onPress?: () => void
}


interface ProfileHeaderProps {
  title: string
  showBackArrow?: boolean
  showNotification?: boolean
  showCurrency?: boolean
  onBackPress?: () => void
  onNotificationPress?: () => void
  rightComponent?: React.ReactNode
  backDestination?: string
}

interface DeleteAccountModalProps {
  visible: boolean
  onClose: () => void
  onConfirm: () => void
  isPending: boolean
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
  address: string
  meansOfIdentification: string
  phoneNumber: string
  profilePicture: string
}

type WithdrawFundsPayload = {
  accountName: string
  accountNumber: string
  amount: string
  bankCode: string
  description: string
  senderWalletId: string
}
type UpdateUserBioPayload = {
  userBio: string
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

type BookAppointmentPayload = {
  additionalDetails: string;
  appointmentDate: string;
  buzzCode: string;
  costOfService: string;
  customerAddress: string;
  hasPet: boolean;
  serviceId: number;
  upfrontPayment: string;
}

type CancelAppointmentPayload = {
  serviceAppointmentId: number
}

type CompleteAppointmentPayload = {
  serviceAppointmentId: number
}

type CreateRatingPayload = {
  ratings: number;
  serviceId: number;

}

type CreateBeneficiaryPayload = {
  accountNumber: string
  bankCode: string
  emailAddress: string
  nickName: string
}

type createReviewPayload = {
  serviceAppointmentId: number
  content: string
}

type AcceptBookingPayload = {
  serviceAppointmentId: number
}

type DeleteProfilePayload = {
  email: string
}

type InitiatePaymentPayload = {
  amount: number
  beneficiaryName: string
  narration: string
  senderEmail: string
}

interface ServiceProviderInfoModalProps {
  visible: boolean;
  onClose: () => void;
  providerName?: string;
  service: string;
  timesProvided: number;
  certificates: number;
  isVerified: boolean;
  isTopProvider: boolean;
  onBook: () => void;
  onViewProfile: () => void;
}



type Message = {
  id: string;
  senderId: string;
  name: string;
  time: string;
  body: string;
  isOrder?: boolean;
  isDelivered?: boolean;
  isSent?: boolean;
}



type SendMessagePayload = {
  content: string;
  contentType: string;
  groupId: string;
  recipientId: string;
  sender: string;
}

type SendMessageOptions = {
  onSuccess?: () => void;
  onError?: () => void;
}

type SubmitReviewPayload = {
  appointmentId: number;
  rating: number;
  comment: string;
}

type PaymentPayload = {
  appointmentId: number;
  amount: string;
  paymentMethod: string;
}

type MakeBookingPaymentPayload = {
  amount: string | null;
  description: string;
  receiverWalletId: string | null;
  senderWalletId: string | null;
}

type ValidateAccountPayload = {
  accountNumber: string;
  bankCode: string;
  emailAddress: string;
}

type Country = {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  exchangeRate: number; // Rate relative to USD
}

type CurrencyStore = {
  selectedCountry: Country | null;
  availableCountries: Country[];
  setSelectedCountry: (country: Country) => void;
  setAvailableCountries: (countries: Country[]) => void;
  getCountryByCurrency: (currency: string) => Country | undefined;
  formatCurrency: (amount: number, currency?: string) => string;
}

type Service = {
  active: boolean;
  address: string | null;
  chatRoomId: string;
  country: string;
  currency: string;
  id: number;
  latitude: string | null;
  longitude: string | null;
  maximumPrice: number;
  minimumPrice: number;
  reviewCount: number;
  ratingCount: string;
  serviceCategoryId: number | null;
  serviceDeliveryType: string;
  serviceDescription: string;
  serviceName: string;
  userEmail: string;
  userId: number;
  studioName?: string;
};


type BankAccount = {
  id: number;
  accountNumber: string;
  bankCode: string;
  emailAddress: string;
  nickName: string;
  newNickname?: string | null;
}

type BankAccountCardProps = {
  account: BankAccount;
  onViewDetails: (account: BankAccount) => void;
}
export type { AcceptBookingPayload, Appointment, AppointmentCardProps, AppointmentSectionProps, AuthHeaderProps, BankAccountCardProps, BookAppointmentPayload, CancelAppointmentPayload, ChangePasswordPayload, CompleteAppointmentPayload, Country, CreateBeneficiaryPayload, CreateRatingPayload, createReviewPayload, CurrencyStore, DeleteAccountModalProps, DeleteProfilePayload, ForgotPasswordPayload, FormData, InitiatePaymentPayload, LoadingStateProps, MakeBookingPaymentPayload, Message, PaymentPayload, ProfileHeaderProps, ResetPasswordPayload, SectionCardProps, SelectOption, SelectProps, SendMessageOptions, SendMessagePayload, Service, ServiceItem, ServiceProviderInfoModalProps, ServiceType, SettingItem, SignInPayload, SignUpPayload, SlideItem, SubmitReviewPayload, UpdateProfilePayload, UpdateUserBioPayload, User, UserContextType, ValidateAccountPayload, ValidateResetPasswordEmailPayload, VerificationPayload, WithdrawFundsPayload };

