import UserBadge from '@/components/common/UserBadge'
import { ServiceItem } from '@/constants/types'
import { useCurrency } from '@/context/currency-context'
import { getDeliveryTypeDisplay } from '@/lib/helper'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const FALLBACK_IMAGE = 'https://images.pexels.com/photos/3998414/pexels-photo-3998414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';


export default function ServiceCard({ item, onPress }: { item: ServiceItem; onPress: () => void }) {
  const { format } = useCurrency()
  const formattedMinPrice = format(item.minimumPrice);
  const formattedMaxPrice = format(item.maximumPrice);

  // Get the first image from uploadImage array, or use fallback
  const imageUrl = item.uploadImage && item.uploadImage.length > 0
    ? item.uploadImage[0].image
    : FALLBACK_IMAGE;

  return (
    <View className="bg-white rounded-lg border border-gray-200 mb-6 overflow-hidden">
      {/* Service Image */}
      <Image
        source={{ uri: imageUrl }}
        className="w-full h-40"
        resizeMode="cover"
      />
      <View className="p-4">
        {/* Service Name and Price Row */}
        <View className="flex-row justify-between items-center mb-1">
          <TouchableOpacity onPress={onPress} className="flex-row items-center">
            <Text className="text-base font-semibold text-primary-900 underline mr-1">
              {item.serviceName}
            </Text>
            <UserBadge
              isBusiness={item.providerBusinessStatus}
              isIndustryCertificateVerified={item.providerVerificationStatus}
              className="w-4 h-4 ml-1"
            />
            {/* Optional: Verified icon */}
            {item.active && (
              <MaterialCommunityIcons name="check-decagram" size={16} color="#22c55e" />
            )}
          </TouchableOpacity>
          <Text className="text-base font-semibold text-gray-900">
            {formattedMinPrice} - {formattedMaxPrice}
          </Text>
        </View>
        {/* Description */}
        <Text className="text-gray-500 text-sm mb-3" numberOfLines={2}>
          {item.serviceDescription}
        </Text>

        {/* Service Details */}
        <View className="mb-3">
          {/* Address */}
          <View className="flex-row items-center mb-1">
            <Ionicons name="location-outline" size={16} color="#6B7280" />
            <Text className="text-gray-600 text-sm ml-1" numberOfLines={1}>
              {item.address || 'No address'}
            </Text>
          </View>

          {/* Delivery Type */}
          {getDeliveryTypeDisplay(item.homeService, item.walkInService) && (
            <View className="flex-row items-center mb-1">
              <Text className="text-xs text-gray-400">Service delivery type: </Text>
              <Text className="text-xs text-gray-400 font-bold">
                {getDeliveryTypeDisplay(item.homeService, item.walkInService)}
              </Text>
            </View>
          )}
        </View>

        {/* Manage Service Link */}
        {/* <TouchableOpacity onPress={onPress} className="flex-row items-center mt-2">
          <Ionicons name="create-outline" size={18} color="#6366F1" />
          <Text className="text-primary-600 ml-2 font-medium">Manage service</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  )
}