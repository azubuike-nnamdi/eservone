import TextInput from '@/components/common/text-input';
import { useServiceCreationStore } from '@/store/service-creation-store';
import React from 'react';

interface ServiceAddressInputProps {
  showErrors: boolean;
}

export default function ServiceAddressInput({ showErrors }: ServiceAddressInputProps) {
  const store = useServiceCreationStore();
  const validation = store.validateStep1();

  return (
    <TextInput
      label="Address *"
      placeholder="e.g., 123 Main St, Anytown, USA"
      value={store.serviceAddress}
      onChangeText={(text) => store.setField('serviceAddress', text)}
      error={showErrors && !store.serviceAddress.trim() && validation.errors.includes("Service address is required") ? "Service address is required" : undefined}
    />
  );
}
