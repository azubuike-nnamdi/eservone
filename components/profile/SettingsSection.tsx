import { generalSettings, legalSettings, supportSettings } from '@/constants/data';
import { EARNINGS, WALLETS } from '@/constants/routes';
import React from 'react';
import { Text, View } from 'react-native';
import GeneralSetting from './general-setting';

interface SettingsSectionProps {
  title: string;
  settings: any[];
  showArrow?: boolean;
}

function SettingsSection({ title, settings, showArrow = true }: SettingsSectionProps) {
  return (
    <View className='mb-4'>
      <Text className='text-xl font-bold mb-4'>{title}</Text>
      {settings.map((setting) => (
        <GeneralSetting
          key={setting.id}
          title={setting.title}
          showArrow={showArrow}
          href={setting.href}
        />
      ))}
    </View>
  );
}

export default function ProfileSettings() {
  return (
    <>
      {/* General Section */}
      <SettingsSection title="General" settings={generalSettings} />

      {/* Additional General Settings */}
      <View className='mb-4'>
        <GeneralSetting
          title='Earnings'
          showArrow={false}
          href={EARNINGS}
        />
        <GeneralSetting
          title='Wallet'
          showArrow={false}
          href={WALLETS}
        />
      </View>

      {/* Legal Section */}
      <SettingsSection title="Legal" settings={legalSettings} />

      {/* Support Section */}
      <SettingsSection title="Support" settings={supportSettings} />
    </>
  );
}
