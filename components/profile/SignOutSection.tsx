import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface SignOutSectionProps {
  signOutModalVisible: boolean;
  setSignOutModalVisible: (visible: boolean) => void;
  onSignOutConfirm: () => void;
}

export default function SignOutSection({
  signOutModalVisible,
  setSignOutModalVisible,
  onSignOutConfirm
}: SignOutSectionProps) {
  return (
    <>
      {/* Sign Out Button */}
      <View className='mt-8'>
        <Text
          className='text-red-500 text-center font-rubikMedium'
          onPress={() => setSignOutModalVisible(true)}
        >
          Sign Out
        </Text>
      </View>

      {/* Sign Out Confirmation Modal */}
      <Modal
        visible={signOutModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSignOutModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-2xl p-6 mx-6 max-w-sm">
            {/* Cry Face Icon */}
            <View className="items-center">
              <Text className="text-6xl mb-2 mt-5">😢</Text>
              <Text className="text-xl font-rubikMedium text-gray-900 mb-2">
                Are you sure?
              </Text>
            </View>

            {/* Description */}
            <Text className="text-gray-600 text-center mb-6 leading-5">
              Signing out will take you out of the application and you'll need to sign in again to access your account.
            </Text>

            {/* Buttons */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg"
                onPress={() => setSignOutModalVisible(false)}
              >
                <Text className="text-gray-700 text-center font-rubikMedium">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 py-3 px-4 bg-red-500 rounded-lg"
                onPress={onSignOutConfirm}
              >
                <Text className="text-white text-center font-rubikMedium">
                  Sign Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
