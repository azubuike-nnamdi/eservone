import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useRef } from 'react'
import { Animated, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'

interface BottomSheetModalProps {
  visible: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export default function BottomSheetModal({ visible, onClose, title, children }: BottomSheetModalProps) {
  const slideAnim = useRef(new Animated.Value(300)).current

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      slideAnim.setValue(300)
    }
  }, [visible, slideAnim])

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose()
    })
  }

  if (!visible) return null

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <TouchableOpacity
          className="flex-1"
          onPress={handleClose}
          activeOpacity={1}
        />

        <Animated.View
          className="bg-white rounded-t-3xl"
          style={{
            transform: [{ translateY: slideAnim }],
            height: '90%'
          }}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
            <Text className="text-lg font-rubikMedium">{title}</Text>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={24} color="#374151" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  )
} 