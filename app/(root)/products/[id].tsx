import Button from "@/components/common/button";
import Checkbox from "@/components/common/check-box";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import LoadingState from "@/components/common/LoadingState";
import ProfileHeader from "@/components/common/profile-header";
import Select from "@/components/common/select";
import TextInput from "@/components/common/text-input";
import { BookAppointmentPayload } from "@/constants/types";
import { useCurrency } from '@/context/currency-context';
import useBookAppointment from "@/hooks/mutation/useBookAppointment";
import useGetServiceById from "@/hooks/query/useGetServiceById";
import useGetUserProfileDetails from "@/hooks/query/useGetUserProfileDetails";
import { getProfileImageUri } from '@/lib/helper';
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Modal, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from 'react-native-calendars';

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

  // Add state for image modal
  const [modalImage, setModalImage] = useState<string | null>(null);

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

  if (isPending) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="p-5">
          <LoadingSkeleton count={3} />
        </View>
      </SafeAreaView>
    );
  }

  const service = serviceData?.data;

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
    const hasBuzzCode = buzzCode.trim().length > 0;
    const hasUpfront = upfront.trim().length > 0;

    return hasAddress && hasDate && hasTime && hasBuzzCode && hasUpfront;
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
      costOfService: service?.minimumPrice?.toString() || '',
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
          <View className="bg-white rounded-xl mb-4">
            <View className="flex-row flex-wrap gap-2 mb-3">
              {service?.uploadImage?.slice(0, 4).map((img: { image: string }, idx: number) => (
                <TouchableOpacity key={idx} onPress={() => setModalImage(img.image)}>
                  <Image
                    source={{ uri: getProfileImageUri(img.image) || undefined }}
                    className="w-20 h-20 rounded-lg"
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View>
            <Text className="text-lg font-bold mb-1">{service?.serviceName || ''}</Text>

            <Text className="text-gray-700 mb-1">{formattedMinPrice} - {formattedMaxPrice}</Text>
            <Text className="text-gray-600 mb-2">{service?.serviceDescription || 'No description provided.'}</Text>

            {/* Service type tabs */}
            <View className="mb-3">
              <View className="flex-row bg-gray-100 rounded-md p-1">
                <TouchableOpacity
                  className={`flex-1 py-3 rounded-md ${selectedServiceType === 'HOME_SERVICE' ? 'bg-primary-300' : 'bg-transparent'}`}
                  onPress={() => setSelectedServiceType('HOME_SERVICE')}
                >
                  <Text className={`text-center font-semibold text-base ${selectedServiceType === 'HOME_SERVICE' ? 'text-white' : 'text-gray-600'}`}>
                    Home service
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`flex-1 py-3 rounded-md ${selectedServiceType === 'WALK_IN_SERVICE' ? 'bg-primary-300' : 'bg-transparent'}`}
                  onPress={() => setSelectedServiceType('WALK_IN_SERVICE')}
                >
                  <Text className={`text-center font-semibold text-base ${selectedServiceType === 'WALK_IN_SERVICE' ? 'text-white' : 'text-gray-600'}`}>
                    Visit service provider
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Address */}
          <View className="mb-2 flex-row justify-between items-center">
            <Text className="text-base font-semibold">
              {isHomeService ? 'Your address' : 'Service provider address'}
            </Text>
            {isHomeService && (
              <TouchableOpacity onPress={() => setIsAddressEditable(!isAddressEditable)}>
                <Text className="text-primary-300 font-semibold">
                  {isAddressEditable ? 'Done' : 'Change address'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
            editable={isHomeService && isAddressEditable}
            pointerEvents={isWalkInService ? 'none' : 'auto'}
          />

          {/* Date and Time */}
          <View className="flex-row mb-2 gap-2">
            <View className="flex-1">
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <TextInput
                  label="Select date"
                  value={date ? date.toISOString().split('T')[0] : ''}
                  placeholder="YYYY-MM-DD"
                  editable={false}
                  pointerEvents="none"
                />
              </TouchableOpacity>
            </View>
            <View className="flex-1">
              <Select label="Select time" value={time} options={filteredTimeOptions} onSelect={v => setTime(v.toString())} />
            </View>
          </View>

          {/* Buzz code and Upfront payment */}
          <View className="flex-row mb-2 gap-2">
            <View className="flex-1">
              <TextInput label="Buzz code" value={buzzCode} onChangeText={setBuzzCode} placeholder="Enter buzz code" />
            </View>
            <View className="flex-1">
              <Select label="Upfront payment (%)" value={upfront} options={upfrontOptions} onSelect={v => setUpfront(v.toString())} />
            </View>
          </View>

          {/* Additional details */}
          <TextInput
            label="Additional details"
            value={details}
            onChangeText={setDetails}
            placeholder="Start typing ..."
            multiline
            numberOfLines={4}
            inputClassName="h-24"
          />

          {/* Pets checkbox */}
          {isHomeService && (
            <Checkbox label="Do you have pets?" checked={hasPets} onChange={setHasPets} />
          )}

          {/* Book service button */}
          <Button className="mt-4"
            onPress={handleBookService}
            disabled={isBookingPending || !isFormValid()}
            loading={isBookingPending}
            loadingText="Booking service..."
          >Book service</Button>
        </View>
      </ScrollView>

      {/* Custom Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="flex-1 bg-white rounded-t-3xl p-6 max-h-96">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-semibold">Select Date</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Text className="text-primary-300 font-semibold">Cancel</Text>
              </TouchableOpacity>
            </View>
            {/* Calendar Picker */}
            <Calendar
              onDayPress={(day: { dateString: string }) => handleDateSelect(day.dateString)}
              markedDates={{
                [date.toISOString().split('T')[0]]: { selected: true, selectedColor: '#6366F1' }
              }}
              minDate={new Date().toISOString().split('T')[0]}
            />
          </View>
        </View>
      </Modal>

      {/* Image Modal */}
      <Modal
        visible={!!modalImage}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalImage(null)}
      >
        <View className="flex-1 bg-black/90 justify-center items-center">
          <TouchableOpacity
            style={{ position: 'absolute', top: 60, right: 30, zIndex: 10 }}
            onPress={() => setModalImage(null)}
          >
            <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold' }}>×</Text>
          </TouchableOpacity>
          {modalImage && (
            <Image
              source={{ uri: getProfileImageUri(modalImage) || undefined }}
              style={{ width: '90%', height: '60%', borderRadius: 16 }}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>

      {isBookingPending && (
        <View className="absolute inset-0 bg-black/50 items-center justify-center">
          <LoadingState isLoading={isBookingPending} />
        </View>
      )}
    </SafeAreaView>
  )
}