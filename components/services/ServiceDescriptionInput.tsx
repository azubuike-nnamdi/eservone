import TextInput from '@/components/common/text-input';
import { useServiceCreationStore } from '@/store/service-creation-store';
import React from 'react';
import { Text, View } from 'react-native';

interface ServiceDescriptionInputProps {
  showErrors: boolean;
}

const MAX_CHARACTERS = 250;

export default function ServiceDescriptionInput({ showErrors }: ServiceDescriptionInputProps) {
  const store = useServiceCreationStore();
  const validation = store.validateStep1();

  const handleTextChange = (text: string) => {
    if (text.length <= MAX_CHARACTERS) {
      store.setField('serviceDescription', text);
    }
  };

  const isOverLimit = store.serviceDescription.length > MAX_CHARACTERS;
  const characterCount = store.serviceDescription.length;

  return (
    <View>
      <TextInput
        label="Describe your service *"
        placeholder="Start typing... Tell clients what makes your service unique."
        value={store.serviceDescription}
        onChangeText={handleTextChange}
        multiline
        numberOfLines={4}
        inputClassName="h-24 items-start pt-3"
        textAlignVertical="top"
        error={
          showErrors && !store.serviceDescription.trim() && validation.errors.includes("Service description is required")
            ? "Service description is required"
            : isOverLimit
              ? `Description must be ${MAX_CHARACTERS} characters or less`
              : undefined
        }
      />
      <View className="flex-row justify-between items-center mt-1">
        <Text className="text-xs text-gray-500">
          {characterCount}/{MAX_CHARACTERS} characters
        </Text>
        {isOverLimit && (
          <Text className="text-xs text-red-500">
            Over limit
          </Text>
        )}
      </View>
    </View>
  );
}
