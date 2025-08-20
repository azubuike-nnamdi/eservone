import { CERTIFICATES, MANAGE_SERVICES, SUBSCRIPTION_DETAILS } from '@/constants/routes';
import React from 'react';
import { View } from 'react-native';
import GeneralSetting from './general-setting';

interface BusinessProfileSectionProps {
  userRole: string | undefined;
}

export default function BusinessProfileSection({ userRole }: BusinessProfileSectionProps) {
  if (userRole !== 'SERVICE_PROVIDER') {
    return null;
  }

  return (
    <>
      {/* Services Section */}
      <View className='mb-4'>
        <GeneralSetting
          title='Manage services'
          showArrow={false}
          href={MANAGE_SERVICES}
        />
        <GeneralSetting
          title='Industrial certificates'
          showArrow={false}
          href={CERTIFICATES}
        />
        <GeneralSetting
          title='Subscription Details'
          showArrow={false}
          href={SUBSCRIPTION_DETAILS}
        />
      </View>
    </>
  );
}
