import TextInput from '@/components/common/text-input';
import { useServiceCreationStore } from '@/store/service-creation-store';
import React from 'react';

interface ServiceNameInputProps {
  showErrors: boolean;
}

export default function ServiceNameInput({ showErrors }: ServiceNameInputProps) {
  const store = useServiceCreationStore();
  const validation = store.validateStep1();

  return (
    <TextInput
      label="Service name *"
      placeholder="e.g., Professional Barbering Services"
      value={store.serviceName}
      onChangeText={(text) => store.setField('serviceName', text)}
      error={showErrors && !store.serviceName.trim() && validation.errors.includes("Service name is required") ? "Service name is required" : undefined}
    />
  );
}
