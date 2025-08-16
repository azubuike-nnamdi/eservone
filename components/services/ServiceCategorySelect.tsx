import Select from '@/components/common/select';
import useGetServiceCategory from '@/hooks/query/useGetServiceCategory';
import { useServiceCreationStore } from '@/store/service-creation-store';
import React, { useMemo } from 'react';

interface ServiceCategorySelectProps {
  showErrors: boolean;
}

// Interface for fetched category data
interface ApiCategory {
  id: number;
  serviceType: string;
}

export default function ServiceCategorySelect({ showErrors }: ServiceCategorySelectProps) {
  const store = useServiceCreationStore();
  const { data: serviceCategoryApiResponse } = useGetServiceCategory();
  const validation = store.validateStep1();

  // Memoize the formatted options to prevent re-calculation on every render
  const formattedServiceCategoryOptions = useMemo(() => {
    const categories: ApiCategory[] = serviceCategoryApiResponse?.data || [];

    return categories.map(category => ({
      label: category.serviceType,
      value: category.id,
    }));
  }, [serviceCategoryApiResponse]);

  return (
    <Select
      label="Service category *"
      placeholder="Select service category"
      options={formattedServiceCategoryOptions}
      value={store.serviceCategory}
      onSelect={(value) => store.setField('serviceCategory', value)}
      error={showErrors && !store.serviceCategory && validation.errors.includes("Service category is required") ? "Service category is required" : undefined}
    />
  );
}
