import Button from "@/components/common/button";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import LoadingState from "@/components/common/LoadingState";
import ProfileHeader from "@/components/common/profile-header";
import BookingForm from "@/components/services/booking-form";
import DatePickerModal from "@/components/services/date-picker-modal";
import ServiceDetails from "@/components/services/service-details";
import ServiceImageGallery from "@/components/services/service-image-gallery";
import { BookAppointmentPayload } from "@/constants/types";
import { useCurrency } from '@/context/currency-context';
import useBookAppointment from "@/hooks/mutation/useBookAppointment";
import useGetServiceById from "@/hooks/query/useGetServiceById";
import useGetUserProfileDetails from "@/hooks/query/useGetUserProfileDetails";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

export default function ProductById() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: serviceData, isPending } = useGetServiceById(id as string);
  const { data: userProfileData } = useGetUserProfileDetails();

  const { handleBookAppointment, isPending: isBookingPending } = useBookAppointment()
  const { format } = useCurrency();

  // Form state
  const [selectedServiceType, setSelectedServiceType] = useState<'HOME_SERVICE' | 'WALK_IN_SERVICE'>('HOME_SERVICE');
  const [address, setAddress] = useState('Suite 41 apartment 9. City name');
  const [isAddressEditable, setIsAddressEditable] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState('9:00 am');
  const [buzzCode, setBuzzCode] = useState('');
  const [upfront, setUpfront] = useState('0');
  const [details, setDetails] = useState('');
  const [hasPets, setHasPets] = useState(false);
  // const [costOfService, setCostOfService] = useState('');
  // const [costError, setCostError] = useState('');

  // Debounce cost validation
  // const debouncedCost = useDebounce(costOfService, 500);

  const upfrontOptions = [
    { label: '0', value: '0' },
    { label: '25', value: '25' },
    { label: '50', value: '50' },
    { label: '75', value: '75' },
    { label: '100', value: '100' },
  ];

  // Initialize service type based on service data
  useEffect(() => {
    if (serviceData?.data) {
      const serviceType = serviceData.data.serviceDeliveryType;
      if (serviceType === 'HOME_SERVICE' || serviceType === 'WALK_IN_SERVICE') {
        setSelectedServiceType(serviceType);
      }
    }
  }, [serviceData]);

  // Update address based on selected service type
  useEffect(() => {
    if (selectedServiceType === 'WALK_IN_SERVICE') {
      // Use service provider's address
      setAddress(serviceData?.data?.address || 'Address not available');
      setIsAddressEditable(false);
    } else if (selectedServiceType === 'HOME_SERVICE') {
      // Use user's home address from profile data
      const userAddress = userProfileData?.data?.address;
      if (userAddress) {
        setAddress(userAddress);
      }
      // Reset address editability when switching to home service
      setIsAddressEditable(false);
    }
  }, [selectedServiceType, serviceData?.data?.address, userProfileData?.data?.address]);

  const service = serviceData?.data;

  // Debounced cost validation
  // useEffect(() => {
  //   if (debouncedCost && service?.minimumPrice && service?.maximumPrice) {
  //     const cost = parseFloat(debouncedCost);
  //     const minPrice = service.minimumPrice;
  //     const maxPrice = service.maximumPrice;

  //     if (isNaN(cost)) {
  //       setCostError('Please enter a valid number');
  //     } else if (cost < minPrice) {
  //       setCostError(`Amount must be at least ${format(minPrice)}`);
  //     } else if (cost > maxPrice) {
  //       setCostError(`Amount cannot exceed ${format(maxPrice)}`);
  //     } else {
  //       setCostError('');
  //     }
  //   } else if (debouncedCost === '') {
  //     // Clear error when input is empty
  //     setCostError('');
  //   }
  // }, [debouncedCost, service?.minimumPrice, service?.maximumPrice, format]);

  if (isPending) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="p-5">
          <LoadingSkeleton count={3} />
        </View>
      </SafeAreaView>
    );
  }

  // Determine if service is WALK_IN_SERVICE or HOME_SERVICE
  const isWalkInService = selectedServiceType === 'WALK_IN_SERVICE';
  const isHomeService = selectedServiceType === 'HOME_SERVICE';

  // Format prices using the service's currency
  const formattedMinPrice = service ? format(service.minimumPrice) : '';
  const formattedMaxPrice = service ? format(service.maximumPrice) : '';

  // Generate 24-hour time options
  const generate24HourOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      const label = hour.toString().padStart(2, '0') + ':00';
      options.push({ label, value: label });
    }
    return options;
  };

  // Filter time options based on selected date
  const getFilteredTimeOptions = () => {
    const allOptions = generate24HourOptions();
    const today = new Date();
    const selectedDateString = date.toISOString().split('T')[0];
    const todayString = today.toISOString().split('T')[0];
    if (selectedDateString === todayString) {
      // Only allow times later than the current hour
      const currentHour = today.getHours();
      return allOptions.filter(opt => parseInt(opt.value.split(':')[0], 10) > currentHour);
    }
    return allOptions;
  };

  const filteredTimeOptions = getFilteredTimeOptions();

  // Validation function to check if all required fields are filled
  const isFormValid = () => {
    const hasAddress = address.trim().length > 0;
    const hasDate = date !== null;
    const hasTime = time.trim().length > 0;
    const hasUpfront = upfront.trim().length > 0;
    // const hasValidCost = costOfService.trim().length > 0 &&
    //   !costError &&
    //   parseFloat(costOfService) >= (service?.minimumPrice || 0) &&
    //   parseFloat(costOfService) <= (service?.maximumPrice || Infinity);

    return hasAddress && hasDate && hasTime && hasUpfront;
  };

  const handleBookService = () => {
    // Format date as YYYY-MM-DD
    const dateString = date.toISOString().split('T')[0];
    // Inline mergeDateAndTimeToISO logic:
    const isoString = new Date(`${dateString}T${time}:00`).toISOString();

    const payload: BookAppointmentPayload = {
      additionalDetails: details,
      appointmentDate: isoString,
      buzzCode,
      // costOfService: service?.minimumPrice?.toString() || '',
      customerAddress: address,
      hasPet: hasPets,
      serviceId: Number(id),
      upfrontPayment: upfront,
    };

    handleBookAppointment(payload, service)
  }

  const handleDateSelect = (dateString: string) => {
    setDate(new Date(dateString));
    setShowDatePicker(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ProfileHeader title="Book Service" showNotification={false} showBackArrow={true} />
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="p-5">
          {/* Service Images */}
          <ServiceImageGallery images={service?.uploadImage || []} />

          {/* Service Details */}
          <ServiceDetails
            serviceName={service?.serviceName || ''}
            serviceDescription={service?.serviceDescription || ''}
            minPrice={formattedMinPrice}
            maxPrice={formattedMaxPrice}
            selectedServiceType={selectedServiceType}
            onServiceTypeChange={setSelectedServiceType}
            homeService={service?.homeService}
            walkInService={service?.walkInService}
          />

          {/* Booking Form */}
          <BookingForm
            address={address}
            isAddressEditable={isAddressEditable}
            isHomeService={isHomeService}
            isWalkInService={isWalkInService}
            onAddressChange={setAddress}
            onAddressEditabilityChange={setIsAddressEditable}
            date={date}
            time={time}
            buzzCode={buzzCode}
            upfront={upfront}
            details={details}
            hasPets={hasPets}
            // costOfService={costOfService}
            // costError={costError}
            onDatePress={() => setShowDatePicker(true)}
            onTimeChange={setTime}
            onBuzzCodeChange={setBuzzCode}
            onUpfrontChange={setUpfront}
            onDetailsChange={setDetails}
            onHasPetsChange={setHasPets}
            // onCostOfServiceChange={setCostOfService}
            timeOptions={filteredTimeOptions}
            upfrontOptions={upfrontOptions}
          // minPrice={formattedMinPrice}
          // maxPrice={formattedMaxPrice}
          />

          {/* Book service button */}
          <Button className="mt-4"
            onPress={handleBookService}
            disabled={isBookingPending || !isFormValid()}
            loading={isBookingPending}
            loadingText="Booking service..."
          >Book service</Button>
        </View>
      </ScrollView>

      {/* Date Picker Modal */}
      <DatePickerModal
        visible={showDatePicker}
        selectedDate={date}
        onClose={() => setShowDatePicker(false)}
        onDateSelect={handleDateSelect}
      />



      {isBookingPending && (
        <View className="absolute inset-0 bg-black/50 items-center justify-center">
          <LoadingState isLoading={isBookingPending} />
        </View>
      )}
    </SafeAreaView>
  )
}