import { SERVICES } from '@/constants/data';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Button from '../common/button';
import Select from '../common/select';

// Types and Interfaces

interface FormData {
  service: string;
  customService: string;
  document: DocumentPicker.DocumentPickerResult | null;
}

// Define the type for the Select component options
interface SelectOption {
  label: string;
  value: string | number;
}

// Constants
const SUPPORTED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

// Document Picker Component
const DocumentPickerComponent: React.FC<{
  document: DocumentPicker.DocumentPickerResult | null;
  onPickDocument: () => Promise<void>;
}> = ({ document, onPickDocument }) => (
  <TouchableOpacity
    className="border border-dashed border-primary bg-primary-50 rounded-lg p-6 items-center justify-center mb-4"
    onPress={onPickDocument}
  >
    {document && !document.canceled ? (
      <View className="flex-row items-center">
        <MaterialIcons name="description" size={24} color="#4A3AFF" />
        <Text className="ml-2 text-primary text-base" numberOfLines={1}>
          {document.assets?.[0]?.name}
        </Text>
      </View>
    ) : (
      <>
        <MaterialIcons name="upload-file" size={24} color="#4A3AFF" />
        <Text className="mt-2 text-primary text-base">Select document</Text>
      </>
    )}
  </TouchableOpacity>
);

// Service Selection Component
const ServiceSelection: React.FC<{
  selectedService: string;
  customService: string;
  onServiceChange: (service: string | number | null) => void;
  onCustomServiceChange: (service: string) => void;
}> = ({ selectedService, customService, onServiceChange, onCustomServiceChange }) => {

  // Map SERVICES to the format needed by your Select component
  const serviceOptions: SelectOption[] = SERVICES.map(service => ({
    label: service.value,
    value: service.key,
  }));

  return (
    <View className="mb-4">
      <Select
        label="Select service"
        placeholder="Select service"
        options={serviceOptions}
        value={selectedService}
        onSelect={onServiceChange}
      />

      {selectedService === 'other' && (
        <View className="mt-4">
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-base"
            placeholder="Enter your service type"
            value={customService}
            onChangeText={onCustomServiceChange}
          />
        </View>
      )}
    </View>
  );
};

// Main Component
export default function AddCertificateForm() {
  const [formData, setFormData] = useState<FormData>({
    service: '',
    customService: '',
    document: null,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Checks if the form is valid for submission
   */
  const isFormValid = (): boolean => {
    if (!formData.service) return false;
    if (formData.service === 'other' && !formData.customService.trim()) return false;
    if (!formData.document || formData.document.canceled || !formData.document.assets?.[0]) return false;
    return true;
  };

  /**
   * Handles document selection using Expo Document Picker
   */
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: SUPPORTED_DOCUMENT_TYPES,
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      setFormData(prev => ({ ...prev, document: result }));
      setErrorMessage('');
    } catch (err) {

      setErrorMessage('Error selecting document');
    }
  };

  /**
   * Validates form data before submission
   */
  const validateForm = (): boolean => {
    if (!formData.service) {
      setErrorMessage('Please select a service');
      return false;
    }

    if (formData.service === 'other' && !formData.customService.trim()) {
      setErrorMessage('Please enter your service type');
      return false;
    }

    if (!formData.document || formData.document.canceled || !formData.document.assets?.[0]) {
      setErrorMessage('Please select a document');
      return false;
    }

    return true;
  };

  /**
   * Prepares document data for API submission
   */
  const prepareDocumentData = async () => {
    if (!formData.document || formData.document.canceled || !formData.document.assets?.[0]) {
      throw new Error('No document selected');
    }

    const fileUri = formData.document.assets[0].uri;
    const base64File = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return {
      name: formData.document.assets[0].name,
      type: formData.document.assets[0].mimeType,
      size: formData.document.assets[0].size,
      base64: base64File,
    };
  };

  /**
   * Handles form submission
   */
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      const documentData = await prepareDocumentData();
      const serviceType = formData.service === 'other'
        ? formData.customService.trim()
        : formData.service;

      // TODO: Send to API
      console.log('Ready to send to API:', {
        service: serviceType,
        document: {
          ...documentData,
          base64: `${documentData.base64.substring(0, 20)}...` // Log truncated base64
        }
      });

      // Reset form after successful submission
      setFormData({
        service: '',
        customService: '',
        document: null,
      });

    } catch (error) {
      setErrorMessage('Error preparing file for upload');
      console.error('Upload error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="p-6">
        <ServiceSelection
          selectedService={formData.service}
          customService={formData.customService}
          onServiceChange={(service) => setFormData(prev => ({ ...prev, service: String(service ?? '') }))}
          onCustomServiceChange={(service) => setFormData(prev => ({ ...prev, customService: service }))}
        />

        <DocumentPickerComponent
          document={formData.document}
          onPickDocument={pickDocument}
        />

        <Text className="text-sm text-gray-600 mb-2">
          Upload certificates that validate the skill you have selected
        </Text>

        <Text className="text-sm text-gray-600 mb-6">
          Please note: Your certificate(s) will go through a verification process before it is approved.
        </Text>

        {errorMessage ? (
          <Text className="text-red-500 text-sm mb-4">{errorMessage}</Text>
        ) : null}

        <Button
          type='submit'
          disabled={!isFormValid() || isSubmitting}
          loading={isSubmitting}
          loadingText='Submitting...'
          onPress={handleSubmit}
        >
          Submit certificate
        </Button>
      </View>
    </View>
  );
}
