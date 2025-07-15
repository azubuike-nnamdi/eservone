import Button from '@/components/common/button'
import icons from '@/constants/icons'
import React, { useState } from 'react'
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function CreateBusinessScreen() {
  const [businessName, setBusinessName] = useState('')
  const [checking, setChecking] = useState(false)
  const [available, setAvailable] = useState<null | boolean>(null)

  // Dummy check availability handler
  const handleCheckAvailability = () => {
    setChecking(true)
    setTimeout(() => {
      setAvailable(true)
      setChecking(false)
    }, 1000)
  }

  return (
    <View className='flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName=' flex-1'>
        <View className='py-6 items-start'>
          <View className='w-20 h-20 rounded-full bg-gray-100 justify-center items-center mb-4'>
            <Image source={icons.businessIcon} className='w-5 h-5' />
          </View>
          <Text className='text-lg font-rubikMedium text-start mb-1'>Start providing services with a business profile!</Text>
          <Text className='text-gray-500 mb-4 text-md leading-6'>Business profiles require a monthly subscription fee of <Text className='text-black font-rubikMedium'>$9.99</Text></Text>
        </View>

        {/* Features/Badges */}
        <View className='mb-6'>
          <View className='flex-row items-start mb-3'>
            <View className='w-6 h-6 rounded-full bg-primary-50 justify-center items-center mr-3 mt-0.5'>
              <Image source={icons.blueBadge} className='w-5 h-5' />
            </View>
            <Text className='text-gray-800 flex-1'>You'll receive a blue badge once your identity is verified.</Text>
          </View>
          <View className='flex-row items-start mb-3'>
            <View className='w-6 h-6 rounded-full bg-green-50 justify-center items-center mr-3 mt-0.5'>
              <Image source={icons.greenBadge} className='w-5 h-5' />
            </View>
            <Text className='text-gray-800 flex-1'>You'll be upgraded to a green badge if you provide verifiable industrial certificates</Text>
          </View>
          <View className='flex-row items-start mb-3'>
            <View className='w-6 h-6 rounded-full bg-gray-100 justify-center items-center mr-3 mt-0.5'>
              <View className='w-4 h-4 rounded-full border border-gray-400' />
            </View>
            <Text className='text-gray-500 flex-1'>You can create up to 5 services with a business profile</Text>
          </View>
        </View>

        {/* Business Name Input */}
        <Text className='text-gray-700 font-rubikMedium mb-2'>Your business name</Text>
        <View className='mb-2'>
          <TextInput
            className='border border-gray-300 rounded-lg p-4 bg-gray-50 text-base'
            placeholder='Enter business name'
            value={businessName}
            onChangeText={setBusinessName}
          />
        </View>
        <TouchableOpacity onPress={handleCheckAvailability} disabled={checking}>
          <Text className='text-primary-500 font-rubikMedium mb-6'>
            {checking ? 'Checking...' : 'Check availability'}
          </Text>
        </TouchableOpacity>
        {available === true && (
          <Text className='text-green-600 mb-4'>Business name is available!</Text>
        )}
        {available === false && (
          <Text className='text-red-600 mb-4'>Business name is not available.</Text>
        )}

        {/* Spacer to push button to bottom */}
        <View className='flex-1 min-h-32' />
      </ScrollView>

      {/* Payment Button - Fixed at bottom */}
      <View className='pb-6 pt-4 bg-white border-t border-gray-100'>
        <Button variant='primary' onPress={() => { }}>
          Make payment
        </Button>
      </View>
    </View>
  )
}