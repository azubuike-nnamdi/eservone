import React from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';

interface ProfileImageModalProps {
  visible: boolean;
  onClose: () => void;
  imageUri: string;
}

const ProfileImageModal: React.FC<ProfileImageModalProps> = ({ visible, onClose, imageUri }) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    <View className="flex-1 bg-black/90 justify-center items-center">
      <TouchableOpacity
        style={{ position: 'absolute', top: 60, right: 30, zIndex: 10 }}
        onPress={onClose}
      >
        <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold' }}>×</Text>
      </TouchableOpacity>
      <Image
        source={{ uri: imageUri }}
        style={{ width: '90%', height: '60%', borderRadius: 16 }}
        resizeMode="contain"
      />
    </View>
  </Modal>
);

export default ProfileImageModal; 