import icons from "./icons";
import images from "./images";
import { ACCOUNT_PREFERENCE, ACCOUNT_SECURITY, PRIVACY_POLICY, PROFILE_INFORMATION, SUPPORT, TERMS_OF_SERVICES } from "./routes";
import { SettingItem, SlideItem } from "./types";

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