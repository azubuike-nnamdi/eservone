import TextInput from '@/components/common/text-input';
import { useServiceCreationStore } from '@/store/service-creation-store';
import React from 'react';

interface ServiceDescriptionInputProps {
  showErrors: boolean;
}

export default function ServiceDescriptionInput({ showErrors }: ServiceDescriptionInputProps) {
  const store = useServiceCreationStore();
  const validation = store.validateStep1();

  return (
    <TextInput
      label="Describe your service *"
      placeholder="Start typing... Tell clients what makes your service unique."
      value={store.serviceDescription}
      onChangeText={(text) => store.setField('serviceDescription', text)}
      multiline
      numberOfLines={4}
      inputClassName="h-24 items-start pt-3"
      textAlignVertical="top"
      error={showErrors && !store.serviceDescription.trim() && validation.errors.includes("Service description is required") ? "Service description is required" : undefined}
    />
  );
}
