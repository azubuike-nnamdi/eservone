import React, { useEffect, useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface UserBioModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (bio: string) => void;
  initialBio?: string;
  isLoading?: boolean;
}

const UserBioModal: React.FC<UserBioModalProps> = ({
  visible,
  onClose,
  onSubmit,
  initialBio = "",
  isLoading
}) => {
  const [bio, setBio] = useState(initialBio);

  useEffect(() => {
    setBio(initialBio);
  }, [initialBio, visible]);

  const handleSubmit = () => {
    onSubmit(bio);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <SafeAreaView className="bg-white rounded-t-2xl p-6 max-h-[60%] mb-4">
          <Text className="text-lg font-bold mb-4 text-center">Edit Bio</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-base mb-8 min-h-[80px]"
            placeholder="Enter your bio..."
            value={bio}
            onChangeText={setBio}
            multiline
            numberOfLines={4}
            editable={!isLoading}
          />
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