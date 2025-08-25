import React, { useEffect, useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface UserBioModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (bio: string, userAddress: string) => void;
  initialBio?: string;
  initialAddress?: string;
  isLoading?: boolean;
}

const UserBioModal: React.FC<UserBioModalProps> = ({
  visible,
  onClose,
  onSubmit,
  initialBio = "",
  initialAddress = "",
  isLoading
}) => {
  const [bio, setBio] = useState(initialBio);
  const [userAddress, setUserAddress] = useState(initialAddress);

  useEffect(() => {
    setBio(initialBio);
    setUserAddress(initialAddress);
  }, [initialBio, initialAddress, visible]);

  const handleSubmit = () => {
    onSubmit(bio, userAddress);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <SafeAreaView className="bg-white rounded-t-2xl p-6 max-h-[70%] mb-4">
          <Text className="text-lg font-bold mb-4 text-center">Edit Profile</Text>

          {/* Bio Input */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Bio</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 text-base min-h-[80px]"
              placeholder="Enter your bio..."
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={4}
              editable={!isLoading}
            />
          </View>

          {/* Address Input */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">Home Address</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 text-base"
              placeholder="Enter your home userAddress..."
              value={userAddress}
              onChangeText={setUserAddress}
              multiline
              numberOfLines={3}
              editable={!isLoading}
            />
          </View>
          <View className="flex-row gap-4">
            <TouchableOpacity
              className="flex-1 py-3 rounded-lg border border-gray-200 bg-gray-100"
              onPress={onClose}
              disabled={isLoading}
            >
              <Text className="text-center text-base text-gray-700 font-semibold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 py-3 rounded-lg bg-primary-300"
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <Text className="text-center text-base text-white font-semibold">
                {isLoading ? "Saving..." : "Submit"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default UserBioModal; 