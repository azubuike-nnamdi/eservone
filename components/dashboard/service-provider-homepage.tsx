import Button from '@/components/common/button'
import ProfileHeader from '@/components/common/profile-header'
import images from '@/constants/images'
import { CREATE_SERVICE } from '@/constants/routes'
import { useGetAccountBalance } from '@/hooks/query/useGetAccountBalance'
import useGetAllServices from '@/hooks/query/useGetAllServices'
import useGetAppointmentCount from '@/hooks/query/useGetAppointmentCount'
import { useGetRating } from '@/hooks/query/useGetRating'
import { useGetAllReviews } from '@/hooks/query/useGetReviews'
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
  // console.log('user', user)
  const { data, isPending } = useGetAllServices()
  const { data: appointmentCount, isPending: appointmentCountPending } = useGetAppointmentCount()
  const { data: reviews, isPending: reviewsPending } = useGetAllReviews({ providerEmail: user?.email ?? "" })
  const { data: rating, isPending: ratingPending } = useGetRating({ providerEmail: user?.email ?? "" })
  const { data: accountBalance, isPending: accountBalancePending } = useGetAccountBalance()
  // const { data: ratings, isPending: ratingsPending } = useGetAllRatings()

  // console.log('appointmentCount', appointmentCount)
  const balance = accountBalance?.data?.accountBalance
  const currency = accountBalance?.data?.currency



  const reviewCount = reviews?.data?.length ?? 0
  const ratingCount = rating?.data ?? 0

  // console.log('review data', reviews?.data)

  const renderContent = () => {
    if (isPending || appointmentCountPending || reviewsPending || ratingPending || accountBalancePending) return <DashboardSkeleton />
    if (!data) return <EmptyState firstName={user?.firstName} />
    return <DashboardScreen appointmentCount={appointmentCount} reviewCount={reviewCount} balance={balance} currency={currency} ratingCount={ratingCount} />
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ProfileHeader title="Service Provider" showNotification={false} showBackArrow={false} />
        <View className="flex-1 px-7 ">
          {renderContent()}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}