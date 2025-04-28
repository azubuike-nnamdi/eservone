import icons from "./icons";
import images from "./images";
import { ACCOUNT_PREFERENCE, ACCOUNT_SECURITY, PRIVACY_POLICY, PROFILE_INFORMATION, SUPPORT, TERMS_OF_SERVICES } from "./routes";
import { Appointment, ServiceType, SettingItem, SlideItem } from "./types";

export const slides: SlideItem[] = [
  {
    image: images.slideImage1,
    id: "1"
  },
  {
    image: images.slideImage2,
    id: "2"
  },
  {
    image: images.slideImage3,
    id: "3"
  },
  {
    image: images.slideImage4,
    id: "4"
  }

];


export const settings = [
  {
    title: "My Bookings",
    icon: icons.calendar,
  },
  {
    title: "Payments",
    icon: icons.wallet,
  },
  {
    title: "Profile",
    icon: icons.person,
  },
  {
    title: "Notifications",
    icon: icons.bell,
  },
  {
    title: "Security",
    icon: icons.shield,
  },
  {
    title: "Language",
    icon: icons.language,
  },
  {
    title: "Help Center",
    icon: icons.info,
  },
  {
    title: "Invite Friends",
    icon: icons.people,
  },
];


export const generalSettings: SettingItem[] = [
  {
    id: 'account-preferences',
    title: 'Account preferences',
    href: ACCOUNT_PREFERENCE,
  },
  {
    id: 'profile-information',
    title: 'Profile information',
    href: PROFILE_INFORMATION,
  },
]

export const supportSettings: SettingItem[] = [
  {
    id: 'support',
    title: 'Support',
    href: SUPPORT,
  },
  {
    id: 'account-security',
    title: 'Account security',
    href: ACCOUNT_SECURITY,
  },
]

export const legalSettings: SettingItem[] = [
  {
    id: 'terms-of-service',
    title: 'Terms of service',
    href: TERMS_OF_SERVICES,
  },
  {
    id: 'privacy-policy',
    title: 'Privacy policy',
    href: PRIVACY_POLICY,
  },
]

export const upcomingAppointments: Appointment[] = [
  {
    id: "1",
    date: "Dec 4",
    time: "6:30am",
    serviceName: "Wig installation",
    location: "XYZ Studios",
    price: 10.5,
  },
]

export const historyAppointments: Appointment[] = [
  {
    id: "2",
    date: "Dec 4",
    time: "6:30am",
    serviceName: "Wig installation",
    location: "XYZ Studios",
    price: 10.5,
    rating: 5.0,
  },
  {
    id: "3",
    date: "Dec 4",
    time: "6:30am",
    serviceName: "Wig installation",
    location: "XYZ Studios",
    price: 10.5,
    rating: 5.0,
  },
]


export const SERVICES: ServiceType[] = [
  { key: 'hair_stylist', value: 'Hair Stylist' },
  { key: 'nail_technician', value: 'Nail Technician' },
  { key: 'makeup_artist', value: 'Makeup Artist' },
  { key: 'massage_therapist', value: 'Massage Therapist' },
  { key: 'vetinarian', value: 'Vetinarian' },
  { key: 'electrician', value: 'Electrician' },
  { key: 'plumber', value: 'Plumber' },
  { key: 'carpenter', value: 'Carpenter' },
  { key: 'painter', value: 'Painter' },
  { key: 'car_mechanic', value: 'Car Mechanic' },
  { key: 'other', value: 'Other' }
];

export const FALLBACK_IMAGE = 'https://images.pexels.com/photos/3998414/pexels-photo-3998414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';