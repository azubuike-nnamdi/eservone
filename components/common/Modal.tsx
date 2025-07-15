import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native'

interface ModalProps {
  visible: boolean
  type: 'success' | 'error' | 'loading'
  title: string
  message: string
  onClose?: () => void
  onConfirm?: () => void
  confirmText?: string
  cancelText?: string
  showCancel?: boolean
}

export default function CustomModal({
  visible,
  type,
  title,
  message,
  onClose,
  onConfirm,
  confirmText = 'OK',
  cancelText = 'Cancel',
  showCancel = false
}: ModalProps) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Ionicons name="checkmark-circle" size={60} color="#10B981" />
      case 'error':
        return <Ionicons name="close-circle" size={60} color="#EF4444" />
      case 'loading':
        return <ActivityIndicator size="large" color="#3B82F6" />
      default:
        return null
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50'
      case 'error':
        return 'bg-red-50'
      case 'loading':
        return 'bg-blue-50'
      default:
        return 'bg-white'
    }
  }

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-green-200'
      case 'error':
        return 'border-red-200'
      case 'loading':
        return 'border-blue-200'
      default:
        return 'border-gray-200'
    }
  }

  const getTitleColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800'
      case 'error':
        return 'text-red-800'
      case 'loading':
        return 'text-blue-800'
      default:
        return 'text-gray-800'
    }
  }

  const getButtonColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-600'
      case 'error':
        return 'bg-red-600'
      case 'loading':
        return 'bg-blue-600'
      default:
        return 'bg-gray-600'
    }
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className={`mx-6 p-6 rounded-xl border ${getBackgroundColor()} ${getBorderColor()}`}>
          {/* Icon */}
          <View className="items-center mb-4">
            {getIcon()}
          </View>

          {/* Title */}
          <Text className={`text-xl font-rubikMedium text-center mb-2 ${getTitleColor()}`}>
            {title}
          </Text>

          {/* Message */}
          <Text className="text-gray-600 text-center mb-6 font-rubikRegular leading-5">
            {message}
          </Text>

          {/* Buttons */}
          <View className="flex-row space-x-3">
            {showCancel && (
              <TouchableOpacity
                onPress={onClose}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg"
              >
                <Text className="text-gray-700 text-center font-rubikMedium">
                  {cancelText}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={onConfirm || onClose}
              className={`flex-1 py-3 px-4 rounded-lg ${getButtonColor()}`}
              disabled={type === 'loading'}
            >
              <Text className="text-white text-center font-rubikMedium">
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
} 