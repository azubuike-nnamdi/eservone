import icons from '@/constants/icons';
import React from 'react';
import { Image } from 'react-native';

interface UserBadgeProps {
  isBusiness?: boolean;
  isIndustryCertificateVerified?: boolean;
  className?: string;
}

export default function UserBadge({
  isBusiness,
  isIndustryCertificateVerified,
  className = "w-4 h-4 ml-1"
}: UserBadgeProps) {
  if (isBusiness === true && isIndustryCertificateVerified === true) {
    return <Image source={icons.greenBadgeWithoutBg} className={className} />;
  }

  if (isBusiness === true) {
    return <Image source={icons.blueBadge} className={className} />;
  }

  return null;
}
