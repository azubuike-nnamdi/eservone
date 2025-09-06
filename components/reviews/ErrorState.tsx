import ProfileHeader from '@/components/common/profile-header';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

interface ErrorStateProps {
  error: Error | null;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <ProfileHeader title='Reviews' showNotification={false} showCurrency={true} showBackArrow={true} />
      <View className="flex-1 items-center justify-center px-8">
        <View className="bg-white rounded-2xl p-8 shadow-lg items-center" style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 3,
        }}>
          <View className="bg-red-100 rounded-full p-5 mb-4">
            <Ionicons name="alert-circle" size={36} color="#EF4444" />
          </View>
          <Text className='text-red-600 text-center text-lg font-bold mb-2'>
            {error?.message}
          </Text>
          <Text className='text-gray-600 text-center mb-6'>Please try again later</Text>
          <TouchableOpacity
            className="bg-red-500 px-6 py-3 rounded-full"
            onPress={onRetry}
          >
            <Text className="text-white text-sm font-medium">Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ErrorState;
