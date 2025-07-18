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
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, Modal, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from 'react-native-calendars';

// Fallback image URL
const FALLBACK_IMAGE = 'https://images.pexels.com/photos/3998414/pexels-photo-3998414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

export default function ProductById() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: serviceData, isPending } = useGetServiceById(id as string);
  const { handleBookAppointment, isPending: isBookingPending } = useBookAppointment()
  const { format } = useCurrency();

  // Form state
  const [address, setAddress] = useState('Suite 41 apartment 9. City name');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState('9:00 am');
  const [buzzCode, setBuzzCode] = useState('');
  const [upfront, setUpfront] = useState('0');
  const [details, setDetails] = useState('');
  const [hasPets, setHasPets] = useState(false);
  const [serviceType, setServiceType] = useState('HOME_SERVICE');

  const upfrontOptions = [
    { label: '0', value: '0' },
    { label: '25', value: '25' },
    { label: '50', value: '50' },
    { label: '75', value: '75' },
    { label: '100', value: '100' },
  ];


  // Set initial service type and address based on serviceDeliveryType
  React.useEffect(() => {
    if (serviceData?.data) {
      const service = serviceData.data;
      if (service.serviceDeliveryType === 'WALK_IN_SERVICE') {
        setServiceType('VISIT_PROVIDER');
        setAddress(service.address || '');
      } else {
        setServiceType('HOME_SERVICE');
      }
    }
  }, [serviceData]);

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

  // Determine if service is WALK_IN_SERVICE
  const isWalkInService = service?.serviceDeliveryType === 'WALK_IN_SERVICE';

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
          {/* Service Card */}
          <View className="bg-white rounded-xl  mb-4">
            {/* Placeholder image */}
            <Image source={{ uri: FALLBACK_IMAGE }} className="w-full h-40 rounded-lg mb-3" />

          </View>
          <View>
            <Text className="text-lg font-bold mb-1">{service?.serviceName || ''}</Text>
            <Text className="text-gray-500 mb-1">XYZ Studios</Text>
            <Text className="text-gray-700 mb-1">{formattedMinPrice} - {formattedMaxPrice}</Text>
            <Text className="text-gray-600 mb-2">{service?.serviceDescription || 'No description provided.'}</Text>
            {/* Service type buttons */}
            <View className="flex-row mb-3">
              <TouchableOpacity
                className={`flex-1 mr-2 py-3 rounded-md border ${serviceType === 'HOME_SERVICE' ? 'bg-primary-300' : 'bg-white border-gray-300'} ${isWalkInService ? 'opacity-50' : ''}`}
                onPress={() => !isWalkInService && setServiceType('HOME_SERVICE')}
                disabled={isWalkInService}
              >
                <Text className={`text-center ${serviceType === 'HOME_SERVICE' ? 'text-white font-semibold' : 'text-gray-700'}`}>Home service</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 py-3 rounded-md border ${serviceType === 'VISIT_PROVIDER' ? 'bg-primary-300' : 'bg-white border-gray-300'}`}
                onPress={() => setServiceType('VISIT_PROVIDER')}
              >
                <Text className={`text-center ${serviceType === 'VISIT_PROVIDER' ? 'text-white font-semibold' : 'text-gray-700'}`}>Visit service provider</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Address */}
          <View className="mb-2 flex-row justify-between items-center">
            <Text className="text-base font-semibold">Your address</Text>
          </View>
          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
            editable={!isWalkInService}
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
          <Checkbox label="Do you have pets?" checked={hasPets} onChange={setHasPets} />

          {/* Book service button */}
          <Button className="mt-4"
            onPress={handleBookService}
            disabled={isBookingPending}
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

      {isBookingPending && (
        <View className="absolute inset-0 bg-black/50 items-center justify-center">
          <LoadingState isLoading={isBookingPending} />
        </View>
      )}
    </SafeAreaView>
  )
}