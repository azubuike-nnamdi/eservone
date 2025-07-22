import icons from "./icons";
import images from "./images";
import { ACCOUNT_SECURITY, PRIVACY_POLICY, PROFILE_INFORMATION, SUPPORT, TERMS_OF_SERVICES } from "./routes";
import { ServiceType, SettingItem, SlideItem } from "./types";

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
  // {
  //   id: 'account-preferences',
  //   title: 'Account preferences',
  //   href: ACCOUNT_PREFERENCE,
  // },
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

export const chatRooms = [
  {
    id: '1',
    name: 'XYZ Studios',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: "Hello, Thank you for contacting us, but may you'll...",
    date: '10/20/23',
  },
  {
    id: '2',
    name: 'Tobi',
    avatar: '', // No avatar
    lastMessage: "Hello, Thank you for contacting us, but may you'll...",
    date: '10/20/23',
  },
  {
    id: '3',
    name: 'Emma Brown',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastMessage: "Hello, Thank you for contacting us, but may you'll...",
    date: '10/20/23',
  },
  {
    id: '4',
    name: 'James Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    lastMessage: "Hello, Thank you for contacting us, but may you'll...",
    date: '10/20/23',
  },
  {
    id: '5',
    name: 'Sophia Davis',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    lastMessage: "Hello, Thank you for contacting us, but may you'll...",
    date: '10/20/23',
  },
];

export const FALLBACK_IMAGE = 'https://images.pexels.com/photos/3998414/pexels-photo-3998414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';