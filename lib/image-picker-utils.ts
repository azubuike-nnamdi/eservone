import * as ImagePicker from 'expo-image-picker';
import { Alert, Platform } from 'react-native';

export interface ImagePickerOptions {
  allowsEditing?: boolean;
  aspect?: [number, number];
  quality?: number;
  mediaTypes?: ImagePicker.MediaTypeOptions;
  base64?: boolean;
  exif?: boolean;
  allowsMultipleSelection?: boolean;
}

export interface ImagePickerResult {
  success: boolean;
  uri?: string;
  base64?: string;
  error?: string;
}

/**
 * iOS 14+ compatible image picker with proper error handling and memory management
 */
export class ImagePickerUtils {
  /**
   * Request media library permissions with iOS 14+ compatibility
   */
  static async requestMediaLibraryPermissions(): Promise<boolean> {
    try {
      if (Platform.OS === 'web') {
        return true;
      }

      // Check current permission status
      const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();

      if (status === 'granted') {
        return true;
      }

      if (status === 'denied') {
        Alert.alert(
          'Permission Denied',
          'Photo library access has been denied. Please enable it in Settings to select images.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => ImagePicker.requestMediaLibraryPermissionsAsync() }
          ]
        );
        return false;
      }

      // Request permission
      const { status: newStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (newStatus !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Photo library access is required to select images. Please grant permission to continue.'
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error('Permission request error:', error);
      Alert.alert('Error', 'Failed to request photo library permissions. Please try again.');
      return false;
    }
  }

  /**
   * Request camera permissions
   */
  static async requestCameraPermissions(): Promise<boolean> {
    try {
      if (Platform.OS === 'web') {
        return true;
      }

      const { status } = await ImagePicker.getCameraPermissionsAsync();

      if (status === 'granted') {
        return true;
      }

      if (status === 'denied') {
        Alert.alert(
          'Permission Denied',
          'Camera access has been denied. Please enable it in Settings to take photos.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => ImagePicker.requestCameraPermissionsAsync() }
          ]
        );
        return false;
      }

      const { status: newStatus } = await ImagePicker.requestCameraPermissionsAsync();

      if (newStatus !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Camera access is required to take photos. Please grant permission to continue.'
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error('Camera permission request error:', error);
      Alert.alert('Error', 'Failed to request camera permissions. Please try again.');
      return false;
    }
  }

  /**
   * Launch image library with iOS 14+ compatibility and memory management
   */
  static async launchImageLibrary(options: ImagePickerOptions = {}): Promise<ImagePickerResult> {
    try {
      const hasPermission = await this.requestMediaLibraryPermissions();
      if (!hasPermission) {
        return { success: false, error: 'Permission denied' };
      }

      const defaultOptions: ImagePickerOptions = {
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7, // Optimized for iOS stability
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: false,
        exif: false, // Disable EXIF to reduce memory usage
        allowsMultipleSelection: false,
        ...options
      };

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: defaultOptions.mediaTypes!,
        allowsEditing: defaultOptions.allowsEditing,
        aspect: defaultOptions.aspect,
        quality: defaultOptions.quality,
        exif: defaultOptions.exif,
        base64: defaultOptions.base64,
        allowsMultipleSelection: defaultOptions.allowsMultipleSelection,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return { success: false, error: 'User cancelled' };
      }

      const asset = result.assets[0];
      if (!asset || !asset.uri) {
        return { success: false, error: 'No image selected' };
      }

      return {
        success: true,
        uri: asset.uri,
        base64: asset.base64 || undefined
      };
    } catch (error) {
      console.error('Image library picker error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Launch camera with iOS 14+ compatibility and memory management
   */
  static async launchCamera(options: ImagePickerOptions = {}): Promise<ImagePickerResult> {
    try {
      const hasPermission = await this.requestCameraPermissions();
      if (!hasPermission) {
        return { success: false, error: 'Permission denied' };
      }

      const defaultOptions: ImagePickerOptions = {
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7, // Optimized for iOS stability
        base64: false,
        exif: false, // Disable EXIF to reduce memory usage
        allowsMultipleSelection: false,
        ...options
      };

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: defaultOptions.allowsEditing,
        aspect: defaultOptions.aspect,
        quality: defaultOptions.quality,
        exif: defaultOptions.exif,
        base64: defaultOptions.base64,
        allowsMultipleSelection: defaultOptions.allowsMultipleSelection,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return { success: false, error: 'User cancelled' };
      }

      const asset = result.assets[0];
      if (!asset || !asset.uri) {
        return { success: false, error: 'No image captured' };
      }

      return {
        success: true,
        uri: asset.uri,
        base64: asset.base64 || undefined
      };
    } catch (error) {
      console.error('Camera picker error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Show image selection options (camera or library)
   */
  static async showImageOptions(
    onImageSelected: (uri: string, base64?: string) => void,
    options: ImagePickerOptions = {}
  ): Promise<void> {
    try {
      Alert.alert(
        'Select Image',
        'Choose how you would like to add an image',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Camera',
            onPress: async () => {
              const result = await this.launchCamera(options);
              if (result.success && result.uri) {
                onImageSelected(result.uri, result.base64);
              } else if (result.error && result.error !== 'User cancelled') {
                Alert.alert('Error', result.error);
              }
            }
          },
          {
            text: 'Photo Library',
            onPress: async () => {
              const result = await this.launchImageLibrary(options);
              if (result.success && result.uri) {
                onImageSelected(result.uri, result.base64);
              } else if (result.error && result.error !== 'User cancelled') {
                Alert.alert('Error', result.error);
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error('Image options error:', error);
      Alert.alert('Error', 'Failed to show image options. Please try again.');
    }
  }
}
