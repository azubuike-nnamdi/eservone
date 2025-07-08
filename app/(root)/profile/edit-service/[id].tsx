import { useCurrency } from '@/context/currency-context'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useRef, useState } from 'react'
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const IMAGE_PLACEHOLDER = require('@/assets/images/partial-react-logo.png'); // Use your placeholder

export default function EditService() {
  const { id } = useLocalSearchParams()
  const { format, symbol } = useCurrency()

  // Mock service data - replace with real API call
  const [serviceName, setServiceName] = useState('Wig installation');
  const [serviceDescription, setServiceDescription] = useState('Sample service description that is looooong and spans to the second line.');
  const [editingName, setEditingName] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [images, setImages] = useState([
    { uri: 'https://images.pexels.com/photos/3998414/pexels-photo-3998414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    null,
    null,
    null
  ]);
  const [minFee, setMinFee] = useState('');
  const [maxFee, setMaxFee] = useState('');

  // For focusing text inputs
  const nameInputRef = useRef(null);
  const descInputRef = useRef(null);

  // Image handlers (mock)
  const handleAddImage = (idx: number) => {
    // TODO: Implement image picker
    const newImages = [...images];
    newImages[idx] = { uri: 'https://images.pexels.com/photos/3998414/pexels-photo-3998414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' };
    setImages(newImages);
  };
  const handleRemoveImage = (idx: number) => {
    const newImages = [...images];
    newImages[idx] = null;
    setImages(newImages);
  };

  // Fee/amount logic
  const min = parseFloat(minFee) || 0;
  const max = parseFloat(maxFee) || 0;
  const estimated = min && max ? (min + max) / 2 : 0;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Header */}
        <View className="flex-row items-center px-4 pt-6 pb-2">
          <TouchableOpacity onPress={() => router.back()} className="mr-2">
            <Ionicons name="arrow-back" size={24} color="#222" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-black flex-1">Manage service</Text>
        </View>

        {/* Service name & description */}
        <View className="px-4 mt-2">
          {/* Name */}
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-gray-500 text-sm">Service name</Text>
            <TouchableOpacity onPress={() => setEditingName(true)} className="flex-row items-center">
              <MaterialIcons name="edit" size={16} color="#6366F1" />
              <Text className="text-xs text-primary-600 ml-1">Edit</Text>
            </TouchableOpacity>
          </View>
          {editingName ? (
            <TextInput
              ref={nameInputRef}
              value={serviceName}
              onChangeText={setServiceName}
              onBlur={() => setEditingName(false)}
              className="text-black text-base font-semibold border-b border-primary-300 mb-2"
              autoFocus
            />
          ) : (
            <Text className="text-black text-base font-semibold mb-2">{serviceName}</Text>
          )}

          {/* Description */}
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-gray-500 text-sm">Service description</Text>
            <TouchableOpacity onPress={() => setEditingDescription(true)} className="flex-row items-center">
              <MaterialIcons name="edit" size={16} color="#6366F1" />
              <Text className="text-xs text-primary-600 ml-1">Edit</Text>
            </TouchableOpacity>
          </View>
          {editingDescription ? (
            <TextInput
              ref={descInputRef}
              value={serviceDescription}
              onChangeText={setServiceDescription}
              onBlur={() => setEditingDescription(false)}
              className="text-black text-base border-b border-primary-300 mb-2"
              multiline
              autoFocus
            />
          ) : (
            <Text className="text-black text-base mb-2" style={{ lineHeight: 22 }}>{serviceDescription}</Text>
          )}
        </View>

        {/* Service images */}
        <View className="px-4 mt-2">
          <Text className="text-gray-500 text-sm mb-2">Service images</Text>
          <View className="flex-row flex-wrap -mx-1">
            {[0, 1, 2, 3].map((idx) => (
              <View key={idx} className="w-1/2 p-1">
                <View className="aspect-square bg-gray-100 rounded-lg items-center justify-center overflow-hidden relative">
                  {images[idx] ? (
                    <>
                      <Image source={{ uri: images[idx]?.uri }} className="w-full h-full" resizeMode="cover" />
                      <TouchableOpacity
                        onPress={() => handleRemoveImage(idx)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                      >
                        <MaterialIcons name="delete" size={20} color="#EF4444" />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <TouchableOpacity onPress={() => handleAddImage(idx)} className="flex-1 w-full h-full items-center justify-center">
                      <Ionicons name="person" size={32} color="#A3A3A3" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Min/Max fee and estimated */}
        <View className="px-4 mt-4">
          <View className="flex-row mb-2 gap-4">
            <View className="flex-1">
              <Text className="text-gray-700 mb-1">Min fee:</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 text-base text-black bg-gray-50"
                placeholder="0.00"
                keyboardType="numeric"
                value={minFee}
                onChangeText={setMinFee}
              />
            </View>
            <View className="flex-1">
              <Text className="text-gray-700 mb-1">Max fee:</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 text-base text-black bg-gray-50"
                placeholder="0.00"
                keyboardType="numeric"
                value={maxFee}
                onChangeText={setMaxFee}
              />
            </View>
          </View>
          <Text className="text-gray-600 mt-2 mb-1">Estimated amount you’ll receive after service fee:</Text>
          <Text className="text-xl font-bold text-primary-900 mb-2">{symbol}{estimated.toFixed(2)}</Text>
        </View>

        {/* Save changes button */}
        <View className="px-4 mt-4">
          <TouchableOpacity
            onPress={() => { }}
            className="bg-primary-900 py-4 rounded-lg mb-3"
          >
            <Text className="text-white text-center font-semibold text-lg">Save changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
} 