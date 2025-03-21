import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationModalProps {
  visible: boolean;
  type?: NotificationType;
  title?: string;
  message: string;
  onClose: () => void;
  variant?: 'default' | 'centered' | 'bottom';
  customIcon?: React.ReactNode;
  hideIcon?: boolean;
}

const getTypeStyles = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return {
        bgColor: 'bg-green-50',
        textColor: 'text-green-700',
        borderColor: 'border-green-200',
        iconBg: 'bg-green-100',
        iconName: 'checkmark-circle-outline'
      };
    case 'error':
      return {
        bgColor: 'bg-red-50',
        textColor: 'text-red-700',
        borderColor: 'border-red-200',
        iconBg: 'bg-red-100',
        iconName: 'alert-circle-outline'
      };
    case 'warning':
      return {
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-700',
        borderColor: 'border-yellow-200',
        iconBg: 'bg-yellow-100',
        iconName: 'warning-outline'
      };
    case 'info':
    default:
      return {
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-700',
        borderColor: 'border-blue-200',
        iconBg: 'bg-blue-100',
        iconName: 'information-circle-outline'
      };
  }
};

const getDefaultIcon = (type: NotificationType, color: string) => {
  const typeStyle = getTypeStyles(type);
  return (
    <Ionicons
      name={typeStyle.iconName as any}
      size={24}
      color={color}
    />
  );
};

const getVariantStyles = (variant: 'default' | 'centered' | 'bottom') => {
  switch (variant) {
    case 'bottom':
      return 'justify-end pb-4';
    case 'centered':
      return 'justify-center';
    default:
      return 'justify-start pt-16';
  }
};

const getDefaultTitle = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return 'Success';
    case 'error':
      return 'Error';
    case 'warning':
      return 'Warning';
    case 'info':
      return 'Information';
    default:
      return '';
  }
};

const NotificationModal: React.FC<NotificationModalProps> = ({
  visible,
  type = 'info',
  title,
  message,
  onClose,
  variant = 'default',
  customIcon,
  hideIcon = false
}) => {
  const typeStyles = getTypeStyles(type);
  const variantStyles = getVariantStyles(variant);
  const displayTitle = title || getDefaultTitle(type);

  // Get the color value from the Tailwind class
  const getColorFromTailwind = (colorClass: string) => {
    const colors: Record<string, string> = {
      'text-green-700': '#15803d',
      'text-red-700': '#b91c1c',
      'text-yellow-700': '#a16207',
      'text-blue-700': '#1d4ed8'
    };
    return colors[colorClass] || '#000000';
  };

  const iconColor = getColorFromTailwind(typeStyles.textColor);
  const icon = customIcon || (!hideIcon && getDefaultIcon(type, iconColor));

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className={`flex-1 items-center bg-black/50 ${variantStyles}`}>
        <View className={`mx-4 w-[90%] max-w-md rounded-2xl border ${typeStyles.borderColor} ${typeStyles.bgColor}`}>
          <View className="p-6">
            <View className="flex-row justify-between items-center mb-4">
              <View className="flex-row items-center space-x-2">
                {icon && (
                  <View className={`rounded-full p-2 ${typeStyles.iconBg}`}>
                    {icon}
                  </View>
                )}
                <Text className={`text-xl font-semibold ${typeStyles.textColor}`}>
                  {displayTitle}
                </Text>
              </View>
              <TouchableOpacity
                onPress={onClose}
                className={`rounded-full p-2 ${typeStyles.iconBg}`}
              >
                <Ionicons
                  name="close-outline"
                  size={20}
                  color={iconColor}
                />
              </TouchableOpacity>
            </View>

            <Text className={`text-base mb-6 ${typeStyles.textColor}`}>
              {message}
            </Text>

            <TouchableOpacity
              className={`py-3 rounded-lg border ${typeStyles.borderColor}`}
              onPress={onClose}
            >
              <Text className={`text-center font-semibold ${typeStyles.textColor}`}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationModal; 