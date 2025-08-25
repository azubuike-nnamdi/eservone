import { SelectProps } from '@/constants/types';
import { cn } from '@/lib/utils';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Modal, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';


export default function Select({
  label,
  value,
  options,
  onSelect,
  placeholder = 'Select an option',
  error,
  containerClassName = '',
  labelClassName = '',
  selectClassName = '',
  errorClassName = '',
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const selectedOption = options.find(option => String(option.value) === String(value))

  return (
    <View className={cn('mb-4', containerClassName)}>
      {label && (
        <Text className={cn('text-sm font-rubikMedium text-gray-700 mb-2', labelClassName)}>
          {label}
        </Text>
      )}
      <TouchableOpacity
        className={cn(
          'border rounded-lg p-4 bg-gray-50 flex-row justify-between items-center', // Added flex for icon
          error ? 'border-red-500' : 'border-gray-300',
          selectClassName
        )}
        onPress={() => setIsOpen(true)}
      >
        <Text className={selectedOption ? 'text-gray-900' : 'text-gray-400'}>
          {selectedOption?.label || placeholder}
        </Text>
        <Ionicons name="chevron-down-outline" size={20} color="gray" />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        {/* Added SafeAreaView and touchable background */}
        <TouchableOpacity
          className="flex-1 bg-black/50"
          activeOpacity={1}
          onPressOut={() => setIsOpen(false)}
        >
          <SafeAreaView className='flex-1 justify-end'>
            <View className="bg-white rounded-t-xl max-h-[50%]">
              <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
                <Text className="text-lg font-rubikMedium">{label || 'Select Option'}</Text>
                <TouchableOpacity onPress={() => setIsOpen(false)} className='p-1'>
                  <Ionicons name="close-outline" size={24} color="#4338CA" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={options}
                keyExtractor={(item) => String(item.value)} // Ensure key is string
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="py-4 px-4 border-b border-gray-100"
                    onPress={() => {
                      onSelect(item.value)
                      setIsOpen(false)
                    }}
                  >
                    <Text className={String(value) === String(item.value) ? 'text-primary-600 font-rubikMedium' : 'text-gray-800 font-rubikRegular'}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
                className='mb-4' // Add some bottom margin for scroll
              />
            </View>
          </SafeAreaView>
        </TouchableOpacity>
      </Modal>

      {error && (
        <Text className={cn('text-red-500 text-sm mt-1', errorClassName)}>
          {error}
        </Text>
      )}
    </View>
  )
} 