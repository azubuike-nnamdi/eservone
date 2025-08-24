import Button from '@/components/common/button';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, Modal, Platform, Text, TouchableOpacity, View } from 'react-native';

interface ProfileImageUploadProps {
  currentImageUri?: string;
  onImageSelected: (uri: string) => void;
  onImageUpload?: (uri: string) => void;
  size?: number;
  className?: string;
  showUploadButton?: boolean;
  isModalVisible?: boolean;
  onModalClose?: () => void;
  isUploading?: boolean;
}

export default function ProfileImageUpload({
  currentImageUri,
  onImageSelected,
  onImageUpload,
  size = 64,
  className = '',
  showUploadButton = false,
  isModalVisible,
  onModalClose,
  isUploading: externalIsUploading
}: ProfileImageUploadProps) {
  const [internalIsUploading, setInternalIsUploading] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  // Use external loading state if provided, otherwise use internal state
  const isUploading = externalIsUploading !== undefined ? externalIsUploading : internalIsUploading;

  // Use external modal control if provided, otherwise use internal state
  const modalVisible = isModalVisible !== undefined ? isModalVisible : showPreviewModal;
  const setModalVisible = onModalClose ? (() => onModalClose()) : setShowPreviewModal;

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Sorry, we need camera roll permissions to make this work!'
        );
        return false;
      }
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      setInternalIsUploading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const uri = result.assets[0].uri;
        setSelectedImageUri(uri);
        setShowPreviewModal(true);
        onImageSelected(uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    } finally {
      setInternalIsUploading(false);
    }
  };

  const takePhoto = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Sorry, we need camera permissions to make this work!'
        );
        return;
      }
    }

    try {
      setInternalIsUploading(true);
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const uri = result.assets[0].uri;
        setSelectedImageUri(uri);
        setShowPreviewModal(true);
        onImageSelected(uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    } finally {
      setInternalIsUploading(false);
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      'Update Profile Picture',
      'Choose an option',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Take Photo', onPress: takePhoto },
        { text: 'Choose from Library', onPress: pickImage },
      ]
    );
  };

  const handleUpload = () => {
    if (selectedImageUri && onImageUpload) {
      onImageUpload(selectedImageUri);
    }
  };



  const handleCancel = () => {
    setSelectedImageUri(null);
    setShowPreviewModal(false);
  };

  const handleImagePress = () => {
    if (currentImageUri) {
      setShowViewModal(true);
    } else {
      showImageOptions();
    }
  };

  return (
    <>
      <View className={`relative ${className}`}>
        <TouchableOpacity
          onPress={handleImagePress}
          disabled={isUploading}
          className="relative"
        >
          {currentImageUri ? (
            <Image
              source={{ uri: currentImageUri }}
              className="rounded-full bg-gray-100"
              style={{ width: size, height: size }}
              resizeMode="cover"
            />
          ) : (
            <View className="rounded-full bg-gray-200 items-center justify-center" style={{ width: size, height: size }}>
              <Ionicons name="person" size={size * 0.4} color="gray" />
            </View>
          )}

          {/* Edit Icon Overlay */}
          <View className="absolute bottom-0 right-0 bg-primary-300 rounded-full p-1.5 border-2 border-white">
            <Ionicons name="camera" size={size * 0.2} color="white" />
          </View>

          {/* Loading Overlay */}
          {isUploading && (
            <View className="absolute inset-0 bg-black/30 rounded-full items-center justify-center">
              <View className="bg-white rounded-full p-2">
                <Ionicons name="refresh" size={size * 0.2} color="#6366F1" />
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* View Current Image Modal */}
      <Modal
        visible={showViewModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowViewModal(false)}
      >
        <View className="flex-1 bg-black/80 justify-center items-center">
          <View className="bg-white rounded-3xl p-6 max-w-sm w-80">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-semibold">Profile Picture</Text>
              <TouchableOpacity onPress={() => setShowViewModal(false)}>
                <Ionicons name="close" size={24} color="gray" />
              </TouchableOpacity>
            </View>

            {/* Current Image Display */}
            <View className="items-center mb-6">
              <Image
                source={{ uri: currentImageUri }}
                className="w-32 h-32 rounded-full bg-gray-100"
                resizeMode="cover"
              />
            </View>

            {/* Action Buttons */}
            <View className="space-y-3">
              <Button
                onPress={() => {
                  setShowViewModal(false);
                  showImageOptions();
                }}
                className="w-full"
              >
                <Ionicons name="camera" size={20} color="white" className="mr-2" />
                Change Picture
              </Button>
              <Button
                onPress={() => setShowViewModal(false)}
                variant="secondary"
                className="w-full"
              >
                Close
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      {/* Preview Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl p-6 max-h-96">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-semibold">Preview Image</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="gray" />
              </TouchableOpacity>
            </View>

            {/* Image Preview */}
            <View className="items-center mb-6">
              <Image
                source={{ uri: selectedImageUri || undefined }}
                className="w-32 h-32 rounded-full bg-gray-100"
                resizeMode="cover"
              />
            </View>

            {/* Action Buttons */}
            {showUploadButton && (
              <View className="space-y-3">
                <Button
                  onPress={handleUpload}
                  className="w-full"
                  disabled={isUploading}
                  loading={isUploading}
                  loadingText="Uploading..."
                >
                  Upload Image
                </Button>
                <Button
                  onPress={handleCancel}
                  variant="secondary"
                  className="w-full"
                >
                  Cancel
                </Button>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}
