import Button from '@/components/common/button'
import ProfileHeader from '@/components/common/profile-header'
import images from '@/constants/images'
import { CREATE_SERVICE } from '@/constants/routes'
import useGetAllServices from '@/hooks/query/useGetAllServices'
import useGetProviderAppointments from '@/hooks/query/useGetProviderAppointments'
import { getGreeting } from '@/lib/helper'
import { useAuthStore } from '@/store/auth-store'
import { router } from 'expo-router'
import React from 'react'
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, Text, View } from 'react-native'
import DashboardSkeleton from './dashboard-skeleton'
import DashboardScreen from './landing'

const EmptyState = ({ firstName }: { firstName?: string }) => (
  <View className="flex-1 justify-center items-center">
    <Image source={images.WorkBag} className="w-16 h-16" />
    <View className="flex-row items-baseline mt-4">
      <Text className="text-2xl font-bold">{getGreeting()},</Text>
      <Text className="text-2xl text-black-300/50 font-medium ml-1">{firstName}</Text>
    </View>
    <Text className='text-base text-black-300 font-rubikLight'>You haven't created any services yet</Text>
    <View className="w-full px-6 mt-8">
      <Button
        type='button'
        onPress={() => router.push(CREATE_SERVICE)}
      >
        Create a service
      </Button>
    </View>
  </View>
)

export default function ServiceProviderHomepage() {
  const { user } = useAuthStore()
  const { data, isPending } = useGetAllServices()
  const { data: appointments, isPending: appointmentsPending, } = useGetProviderAppointments();

  const renderContent = () => {
    if (isPending || appointmentsPending) return <DashboardSkeleton />
    if (!data) return <EmptyState firstName={user?.firstName} />
    return <DashboardScreen appointments={appointments} />
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ProfileHeader title="Service Provider" showNotification={true} showBackArrow={false} />
        <View className="flex-1 px-7 ">
          {renderContent()}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}