import ProfileHeader from "@/components/common/profile-header";
import ProviderAppointmentStats from "@/components/profile/ProviderAppointmentStats";
import ProviderProfileBio from "@/components/profile/ProviderProfileBio";
import ProviderProfileStats from "@/components/profile/ProviderProfileStats";
import ProviderProfileTabs from "@/components/profile/ProviderProfileTabs";
import ProviderReviewsList from "@/components/profile/ProviderReviewsList";
import ProviderServicesList from "@/components/profile/ProviderServicesList";
import { AppointmentCount } from '@/constants/types';
import useGetUserProfileByEmail from '@/hooks/query/useGetUserProfileByEmail';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native';

export default function ViewProviderProfile() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const emailAddress = params.emailAddress as string;
  const [activeTab, setActiveTab] = useState<'services' | 'reviews'>('services');

  // Get user profile data
  const { data: userProfile, isPending, error } = useGetUserProfileByEmail(emailAddress);

  console.log('provider profile', userProfile?.data)

  if (isPending) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <ProfileHeader title="Loading..." showNotification={false} showBackArrow={true} />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !userProfile) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <ProfileHeader title="Error" showNotification={false} showBackArrow={true} />
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-lg text-red-600 text-center">Failed to load profile</Text>
          <Text className="text-gray-600 text-center mt-2">
            {error?.message || 'Something went wrong while loading the profile'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Extract appointment counts from the data
  const getAppointmentCount = (status: string) => {
    const appointment = userProfile.data.appointmentCount?.find(
      (appt: AppointmentCount) => appt.statusCount === status
    );
    return appointment ? parseInt(appointment.serviceStatus) : 0;
  };

  const completedAppointments = getAppointmentCount('COMPLETED');
  const pendingAppointments = getAppointmentCount('PENDING');

  const handleServicePress = (id: string) => {
    router.push(`/products/${id}`);
  };

  const handleTabPress = (tab: 'services' | 'reviews') => {
    setActiveTab(tab);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ProfileHeader
        title={userProfile.data.businessName || userProfile.data.providerName}
        showNotification={false}
        showBackArrow={true}
      />

      <View className="flex-1 px-6">
        {/* Bio Section */}
        <ProviderProfileBio bio={userProfile.data.bio} />

        {/* Business Owner and Rating */}
        <ProviderProfileStats
          providerName={userProfile.data.providerName}
          ratingCount={userProfile.data.currentRatings?.ratingCount || 0}
          reviewCount={userProfile.data.currentRatings?.reviewCount || 0}
        />

        {/* Appointment Statistics */}
        <ProviderAppointmentStats
          completedAppointments={completedAppointments}
          pendingAppointments={pendingAppointments}
        />

        {/* Navigation Tabs */}
        <ProviderProfileTabs
          activeTab={activeTab}
          onTabPress={handleTabPress}
          servicesCount={userProfile.data.services?.length || 0}
          reviewsCount={userProfile.data.reviews?.length || 0}
        />

        {/* Tab Content */}
        {activeTab === 'services' && (
          <ProviderServicesList
            services={userProfile.data.services || []}
            onBookService={handleServicePress}
          />
        )}

        {activeTab === 'reviews' && (
          <ProviderReviewsList
            reviews={userProfile.data.reviews || []}
            businessName={userProfile.data.businessName}
          />
        )}
      </View>
    </SafeAreaView>
  );
}