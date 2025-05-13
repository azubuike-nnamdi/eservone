import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, Text, View } from 'react-native';

export type ToastType = 'success' | 'error' | 'loading' | 'info';

interface ToastNotificationProps {
  visible: boolean;
  message: string;
  type: ToastType;
  duration?: number;
  onHide?: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  visible,
  message,
  type,
  duration = 3000,
  onHide,
}) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after duration
      if (type !== 'loading') {
        const timer = setTimeout(() => {
          hideToast();
        }, duration);

        return () => clearTimeout(timer);
      }
    }
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide?.();
    });
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Ionicons name="checkmark-circle" size={24} className="text-green-500" />;
      case 'error':
        return <Ionicons name="alert-circle" size={24} className="text-red-500" />;
      case 'loading':
        return <ActivityIndicator size="small" className="text-blue-500" />;
      case 'info':
        return <Ionicons name="information-circle" size={24} className="text-blue-500" />;
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50';
      case 'error':
        return 'bg-red-50';
      case 'loading':
        return 'bg-blue-50';
      case 'info':
        return 'bg-blue-50';
      default:
        return 'bg-white';
    }
  };

  if (!visible) return null;

  return (
    <Animated.View
      className={`absolute top-20 self-center p-4 z-50 shadow-lg w-[150px] rounded-xl ${getBackgroundColor()}`}
      style={{
        transform: [{ translateY }],
        opacity,
      }}
    >
      <View className="flex-row items-center justify-center">
        {getIcon()}
        <Text className="ml-3 text-xs text-gray-800 flex-1">{message}</Text>
      </View>
    </Animated.View>
  );
};

export default ToastNotification;
