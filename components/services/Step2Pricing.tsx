import { formatNumberWithCommas } from '@/lib/helper';
import { useServiceCreationStore } from '@/store/service-creation-store';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import KeyboardAwareScrollView from '../common/keyboard-aware-scroll-view';



export default function Step2Pricing() {
  const { minFee, maxFee, setField } = useServiceCreationStore()


  // Local state for display values
  const [minFeeDisplay, setMinFeeDisplay] = useState<string>(minFee ? String(minFee) : '')
  const [maxFeeDisplay, setMaxFeeDisplay] = useState<string>(maxFee ? String(maxFee) : '')
  const [feeError, setFeeError] = useState<string>('')

  // Handlers for min fee
  const handleMinFeeChange = (value: string) => {
    const raw = value.replace(/,/g, '')
    setMinFeeDisplay(raw)
    const numericValue = parseFloat(raw) || 0
    setField('minFee', numericValue)
    // Clear error on change
    setFeeError('')
  }
  const handleMinFeeBlur = () => {
    setMinFeeDisplay(formatNumberWithCommas(minFeeDisplay))
    // Validation
    const min = parseFloat(minFeeDisplay.replace(/,/g, '')) || 0
    const max = parseFloat(maxFeeDisplay.replace(/,/g, '')) || 0
    if (max > 0 && max < min) {
      setFeeError('Max fee cannot be less than min fee.')
    } else {
      setFeeError('')
    }
  }
  const handleMinFeeFocus = () => {
    setMinFeeDisplay(minFee ? String(minFee) : '')
  }

  // Handlers for max fee
  const handleMaxFeeChange = (value: string) => {
    const raw = value.replace(/,/g, '')
    setMaxFeeDisplay(raw)
    const numericValue = parseFloat(raw) || 0
    setField('maxFee', numericValue)
    // Real-time validation
    const min = parseFloat(minFeeDisplay.replace(/,/g, '')) || 0
    if (numericValue > 0 && numericValue < min) {
      setFeeError('Max fee cannot be less than min fee.')
    } else {
      setFeeError('')
    }
  }
  const handleMaxFeeBlur = () => {
    setMaxFeeDisplay(formatNumberWithCommas(maxFeeDisplay))
    // Validation
    const min = parseFloat(minFeeDisplay.replace(/,/g, '')) || 0
    const max = parseFloat(maxFeeDisplay.replace(/,/g, '')) || 0
    if (max > 0 && max < min) {
      setFeeError('Max fee cannot be less than min fee.')
    } else {
      setFeeError('')
    }
  }
  const handleMaxFeeFocus = () => {
    setMaxFeeDisplay(maxFee ? String(maxFee) : '')
  }

  return (
    <KeyboardAwareScrollView className="flex-1 bg-white">
      <View className="pt-8 px-4">
        <Text className="text-xl font-semibold text-black mb-1">Set your service rate</Text>
        <Text className="text-gray-500 mb-6">
          Clients will see this rate on your profile once you publish this service. You can adjust the rate at anytime.
        </Text>

        {/* Min/Max fee side by side */}
        <View className="flex-row mb-2 space-x-4 gap-4">
          <View className="flex-1">
            <Text className="text-base text-gray-700 mb-1">Min fee:</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 text-base text-black bg-gray-50"
              placeholder="0.00"
              keyboardType="numeric"
              value={minFeeDisplay}
              onChangeText={handleMinFeeChange}
              onBlur={handleMinFeeBlur}
              onFocus={handleMinFeeFocus}
            />
          </View>
          <View className="flex-1">
            <Text className="text-base text-gray-700 mb-1">Max fee:</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 text-base text-black bg-gray-50"
              placeholder="0.00"
              keyboardType="numeric"
              value={maxFeeDisplay}
              onChangeText={handleMaxFeeChange}
              onBlur={handleMaxFeeBlur}
              onFocus={handleMaxFeeFocus}
            />
          </View>
        </View>
        {feeError ? (
          <Text className="text-red-500 text-sm mt-1 mb-2">{feeError}</Text>
        ) : null}

        {/* Optionally, you can add price range/average display below if needed */}
        {/*
        <View className="flex-row justify-between mb-2">
          <Text className="text-sm text-gray-600">Price Range</Text>
          <Text className="text-sm font-semibold text-primary-300">
            {format(minFee)} - {format(maxFee)}
          </Text>
        </View>
        */}
      </View>
    </KeyboardAwareScrollView>
  )
} 