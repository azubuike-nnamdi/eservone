import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface UserBioModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (bio: string, userAddress: string) => void;
  initialBio?: string;
  initialAddress?: string;
  isLoading?: boolean;
}

const MAX_BIO_CHARACTERS = 250;

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

  const handleBioChange = (text: string) => {
    if (text.length <= MAX_BIO_CHARACTERS) {
      setBio(text);
    }
  };

  const handleSubmit = () => {
    onSubmit(bio, userAddress);
  };

  const isBioOverLimit = bio.length > MAX_BIO_CHARACTERS;
  const bioCharacterCount = bio.length;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View className="flex-1 justify-end bg-black/40">
          <SafeAreaView className="bg-white rounded-t-2xl p-6 max-h-[70%] mb-4">
            <Text className="text-lg font-bold mb-4 text-center">Edit Profile</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Bio Input */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">Bio</Text>
                <TextInput
                  className={`border rounded-lg p-3 text-base min-h-[80px] ${isBioOverLimit ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="Enter your bio..."
                  value={bio}
                  onChangeText={handleBioChange}
                  multiline
                  numberOfLines={4}
                  editable={!isLoading}
                />
                <View className="flex-row justify-between items-center mt-1">
                  <Text className="text-xs text-gray-500">
                    {bioCharacterCount}/{MAX_BIO_CHARACTERS} characters
                  </Text>
                  {isBioOverLimit && (
                    <Text className="text-xs text-red-500">
                      Over limit
                    </Text>
                  )}
                </View>
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
            </ScrollView>

            <View className="flex-row gap-4 mt-4">
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
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default UserBioModal; 