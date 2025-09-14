import Button from '@/components/common/button'
import KeyboardAwareScrollView from '@/components/common/keyboard-aware-scroll-view'
import CustomModal from '@/components/common/Modal'
import ProfileHeader from '@/components/common/profile-header'
import { UpdateProfilePayload } from '@/constants/types'
import useUpdateProfile from '@/hooks/mutation/useUpdateProfile'
import { useModal } from '@/hooks/useModal'
import { useAuthStore } from '@/store/auth-store'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import React, { useEffect, useState } from 'react'
import {
  Image,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

export default function VerifyIdentity() {
  const user = useAuthStore((state) => state.user)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [idDocument, setIdDocument] = useState<DocumentPicker.DocumentPickerSuccessResult | null>(null)
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState(user?.email || '')
  const [phoneNumber, setPhoneNumber] = useState('')
  const { handleUpdateProfile, isPending } = useUpdateProfile()
  const { modalState, showError, hideModal } = useModal()

  useEffect(() => {
    setEmail(user?.email || '')
  }, [user])

  const pickProfileImage = async () => {
    // Request media library permissions
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      showError(
        'Permission Required',
        'You need to allow access to your photos to upload a profile picture.'
      )
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri)
    }
  }

  const pickIdDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf', 'application/docx'], // Allow images, PDFs, and DOCX
        copyToCacheDirectory: true, // Recommended for uploads
      })

      if (!result.canceled) {
        // result is DocumentPickerSuccessResult
        setIdDocument(result)
      } else {
        // result is DocumentPickerCanceledResult
        setIdDocument(null) // Clear previous selection if cancelled
      }
    } catch (error) {
      console.error('Error picking document:', error)
      showError('Error', 'Could not pick document.')
    }
  }

  const handleSubmit = async () => {
    const profileImageUri = profileImage;
    const documentAsset = idDocument?.assets?.[0]

    if (!profileImageUri) {
      showError('Missing Information', 'Please upload a profile picture.')
      return
    }
    if (!documentAsset) {
      showError('Missing Information', 'Please upload a valid means of identification.')
      return
    }
    if (!address || !phoneNumber) { // Email is fetched from store, not strictly required here
      showError('Missing Information', 'Please fill in Home Address and Phone Number.')
      return
    }

    try {
      // Convert profile image to base64
      const profileImageBase64 = await FileSystem.readAsStringAsync(profileImageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Convert document to base64
      const documentBase64 = await FileSystem.readAsStringAsync(documentAsset.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Create the payload with actual base64 image data
      const payload: UpdateProfilePayload = {
        address,
        meansOfIdentification: documentBase64, // Send actual document data
        phoneNumber,
        profilePicture: profileImageBase64, // Send actual image data
      }

      handleUpdateProfile(payload)
    } catch (error) {
      console.error('Error converting files to base64:', error);
      showError('Error', 'Failed to process files. Please try again.');
    }
  }

  const documentName = idDocument?.assets?.[0]?.name;

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <KeyboardAwareScrollView
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        contentContainerClassName="pb-32"
      >
        <ProfileHeader title='Verify Identity' showNotification={false} showBackArrow={true} />

        <View className='px-7 my-5 items-center'>
          <Text className='text-gray-700 text-md font-medium mb-2'>Verify Identity</Text>
          <Text className='text-gray-700 text-sm font-rubikRegular text-center px-7'>
            Verifying your identity increases your chances of getting a job. It&apos;s a way to show that you&apos;re trusted eservone service provider.
          </Text>
        </View>

        {/* Profile Picture Upload */}
        <View className='items-center mt-8 mb-6 px-7'>
          <TouchableOpacity
            onPress={pickProfileImage}
            className='size-28 bg-gray-200 rounded-full justify-center items-center mb-3'
          >
            {profileImage ? (
              <Image source={{ uri: profileImage }} className='size-28 rounded-full' />
            ) : (
              <Ionicons name='person-outline' size={40} color='gray' />
            )}
          </TouchableOpacity>
          <Text className='text-primary-500 font-rubikMedium text-base'>Upload a profile picture</Text>
          <Text className='text-center text-gray-500 text-sm mt-1'>
            Please make sure your profile picture properly captures your face
          </Text>
        </View>

        {/* ID Upload */}
        <View className='items-center mb-8 px-7'>
          <TouchableOpacity
            onPress={pickIdDocument}
            className='w-full h-36 border-2 border-dashed border-primary-300 rounded-lg justify-center items-center bg-primary-50 mb-3'
          >
            {documentName ? (
              <View className='items-center px-4'>
                <MaterialIcons name='check-circle' size={32} color='green' />
                <Text className='text-gray-700 mt-2 text-sm font-rubikRegular text-center' numberOfLines={2} ellipsizeMode='middle'>
                  {documentName}
                </Text>
              </View>
            ) : (
              <View className='items-center'>
                <MaterialIcons name='cloud-upload' size={40} color='gray' />
                <Text className='text-primary-500 font-rubikMedium mt-2'>Select image, PDF, or DOCX</Text>
              </View>
            )}
          </TouchableOpacity>
          <Text className='text-primary-500 font-rubikMedium text-base'>Upload a valid means of Identification</Text>
          <Text className='text-center text-gray-500 text-sm mt-1'>
            The details on your means of ID must match the personal details on your eservone account
          </Text>
        </View>

        {/* Input Fields */}
        <View className='mb-6 space-y-5 px-7'>
          <View>
            <Text className='text-sm font-rubikMedium text-gray-700 mb-2'>Home address:</Text>
            <TextInput
              className='border border-gray-300 rounded-lg p-5 bg-gray-50'
              placeholder='Enter your home address'
              value={address}
              onChangeText={setAddress}
            />
          </View>
          <View className='py-4'>
            <Text className='text-sm font-rubikMedium text-gray-700 mb-2'>Email address:</Text>
            <TextInput
              className='border border-gray-300 rounded-lg p-5 bg-gray-200 text-gray-500'
              placeholder='Enter your email address'
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
              autoCapitalize='none'
              editable={false}
            />
          </View>
          <View>
            <Text className='text-sm font-rubikMedium text-gray-700 mb-2'>Phone number:</Text>
            <TextInput
              inputMode='numeric'
              className='border border-gray-300 rounded-lg p-5 bg-gray-50'
              placeholder='Enter your phone number'
              value={phoneNumber}
              onChangeText={(text) => {
                // Only allow numeric input
                const numericValue = text.replace(/[^0-9]/g, '');
                setPhoneNumber(numericValue);
              }}
              keyboardType='phone-pad'
            />
          </View>
        </View>

        {/* Submit Button */}
        <View className='px-7'>
          <Button
            onPress={handleSubmit}
            variant='primary'
            loading={isPending}
            disabled={isPending}
            loadingText='Submitting...'
          >
            Submit
          </Button>
        </View>
      </KeyboardAwareScrollView>

      {/* Custom Modal */}
      <CustomModal
        visible={modalState.visible}
        type={modalState.type}
        title={modalState.title}
        message={modalState.message}
        onClose={hideModal}
        onConfirm={modalState.onConfirm}
        confirmText={modalState.confirmText}
        cancelText={modalState.cancelText}
        showCancel={modalState.showCancel}
      />
    </SafeAreaView>
  )
}