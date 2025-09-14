import useUploadIndustrialCertificate from '@/hooks/mutation/useUploadIndustrialCertificate';
import useGetServiceCategoryByUser from '@/hooks/query/useGetServiceCategoryByUser';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Button from '../common/button';
import Select from '../common/select';

// Types and Interfaces

interface FormData {
  service: string | number;
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
  serviceCategories: any[];
  isLoading?: boolean;
}> = ({ selectedService, customService, onServiceChange, onCustomServiceChange, serviceCategories, isLoading }) => {

  // Map service categories from API to the format needed by Select component
  const serviceOptions: SelectOption[] = serviceCategories?.map(service => ({
    label: service.serviceName,
    value: service.id,
  })) || [];

  if (isLoading) {
    return (
      <View className="mb-4">
        <Text className="text-gray-500 text-center py-4">Loading service categories...</Text>
      </View>
    );
  }

  if (!serviceCategories || serviceCategories.length === 0) {
    return (
      <View className="mb-4">
        <Text className="text-red-500 text-center py-4">No service categories available</Text>
      </View>
    );
  }

  return (
    <View className="mb-4">
      <Select
        label="Select service"
        placeholder={isLoading ? "Loading services..." : "Select service"}
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

  const { data: serviceCategory, isPending: isLoadingCategories } = useGetServiceCategoryByUser()

  const { handleUploadIndustrialCertificate, isPending } = useUploadIndustrialCertificate()
  const [errorMessage, setErrorMessage] = useState('');


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
    const fileSize = formData.document.assets[0].size || 0;

    // Check file size limit (10MB) to prevent memory issues on iOS
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (fileSize > MAX_FILE_SIZE) {
      throw new Error('File size too large. Please select a file smaller than 10MB.');
    }

    try {
      const base64File = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return {
        name: formData.document.assets[0].name,
        type: formData.document.assets[0].mimeType,
        size: fileSize,
        base64: base64File,
      };
    } catch (error) {
      console.error('Error reading file:', error);
      throw new Error('Failed to process document. Please try again.');
    }
  };

  /**
   * Handles form submission
   */
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const documentData = await prepareDocumentData();

      // Use the service ID from API, or custom service name if "other" is selected
      const serviceId = formData.service === 'other'
        ? formData.customService.trim()
        : String(formData.service);

      const payload = {
        fileName: documentData.name,
        serviceId: serviceId,
        industryCertificate: documentData.base64
      }

      handleUploadIndustrialCertificate(payload)
    } catch (error) {
      console.error('Upload error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to upload document. Please try again.');
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="p-6">
        <ServiceSelection
          selectedService={String(formData.service)}
          customService={formData.customService}
          onServiceChange={(service) => {
            setFormData(prev => ({ ...prev, service: service !== null && service !== undefined ? service : '' }));
          }}
          onCustomServiceChange={(service) => setFormData(prev => ({ ...prev, customService: service }))}
          serviceCategories={serviceCategory?.data || []}
          isLoading={isLoadingCategories}
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
          disabled={!isFormValid() || isPending}
          loading={isPending}
          loadingText='Submitting...'
          onPress={handleSubmit}
        >
          Submit certificate
        </Button>
      </View>
    </View>
  );
}
