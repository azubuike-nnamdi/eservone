import LoadingSkeleton from '@/components/common/LoadingSkeleton'
import EditServiceModal from '@/components/services/EditServiceModal'
import useGetServiceById from '@/hooks/query/useGetServiceById'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function EditService() {
  const { id } = useLocalSearchParams()
  const { data: serviceData, isPending } = useGetServiceById(id as string);
  const serviceItem = serviceData?.data


  // Modal state
  const [modalVisible, setModalVisible] = useState(false);

  // Save handler for modal
  const handleSave = (updated: { serviceName: string; serviceDescription: string; minimumPrice: string; maximumPrice: string }) => {
    // TODO: Call update service API here
    // Example: await updateService({ id, ...updated })
    setModalVisible(false);
  };

  if (isPending) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="p-5">
          <LoadingSkeleton count={3} />
        </View>
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Header */}
        <View className="flex-row items-center px-4 pt-6 pb-2">
          <TouchableOpacity onPress={() => router.back()} className="mr-2">
            <Ionicons name="arrow-back" size={24} color="#222" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-black flex-1">Manage service</Text>
          {/* Single Edit Button */}
          <TouchableOpacity onPress={() => setModalVisible(true)} className="ml-2 p-2">
            <MaterialIcons name="edit" size={22} color="#6366F1" />
          </TouchableOpacity>
        </View>

        {/* Service name & description */}
        <View className="px-4 mt-2">
          <Text className="text-gray-500 text-sm mb-1">Service name</Text>
          <Text className="text-black text-base font-semibold mb-2">{serviceItem?.serviceName}</Text>
          <Text className="text-gray-500 text-sm mb-1">Service description</Text>
          <Text className="text-black text-base mb-2" style={{ lineHeight: 22 }}>{serviceItem?.serviceDescription}</Text>
        </View>

        {/* Service images (unchanged) */}
        <View className="px-4 mt-2">
          <Text className="text-gray-500 text-sm mb-2">Service images</Text>
          <View className="flex-row flex-wrap -mx-1">
            {serviceItem?.image ? (
              <View className="w-1/2 p-1">
                <View className="aspect-square bg-gray-100 rounded-lg items-center justify-center overflow-hidden relative">
                  <Image source={{ uri: serviceItem.image }} className="w-full h-full" resizeMode="cover" />
                </View>
              </View>
            ) : (
              <View className="w-1/2 p-1">
                <View className="aspect-square bg-gray-100 rounded-lg items-center justify-center overflow-hidden relative">
                  <Ionicons name="image-outline" size={32} color="#A3A3A3" />
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Min/Max fee and estimated */}
        <View className="px-4 mt-4">
          <View className="flex-row mb-2 gap-4">
            <View className="flex-1">
              <Text className="text-gray-700 mb-1">Min fee:</Text>
              <Text className="border border-gray-300 rounded-lg p-3 text-base text-black bg-gray-50">{serviceItem?.minimumPrice}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-gray-700 mb-1">Max fee:</Text>
              <Text className="border border-gray-300 rounded-lg p-3 text-base text-black bg-gray-50">{serviceItem?.maximumPrice}</Text>
            </View>
          </View>
          <View className='mt-2 bg-primary-100 p-2 rounded-lg'>
            <Text className='text-gray-500 text-sm font-semibold'>
              NB: EservOne Charges 10% commission on all completed transactions.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <EditServiceModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        service={serviceItem}
        onSave={handleSave}
      />
    </SafeAreaView>
  )
} 