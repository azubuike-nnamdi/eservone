import Button from "@/components/common/button";
import Checkbox from "@/components/common/check-box";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import LoadingState from "@/components/common/LoadingState";
import ProfileHeader from "@/components/common/profile-header";
import Select from "@/components/common/select";
import TextInput from "@/components/common/text-input";
import { BookAppointmentPayload } from "@/constants/types";
import useBookAppointment from "@/hooks/mutation/useBookAppointment";
import useGetServiceById from "@/hooks/query/useGetServiceById";
import { mergeDateAndTimeToISO } from "@/lib/helper";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

// Fallback image URL
const FALLBACK_IMAGE = 'https://images.pexels.com/photos/3998414/pexels-photo-3998414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
export default function ProductById() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: serviceData, isPending } = useGetServiceById(id as string);
  const { handleBookAppointment, isPending: isBookingPending } = useBookAppointment()

  // Form state
  const [address, setAddress] = useState('Suite 41 apartment 9. City name');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('9:00 am');
  const [buzzCode, setBuzzCode] = useState('');
  const [upfront, setUpfront] = useState('0');
  const [details, setDetails] = useState('');
  const [hasPets, setHasPets] = useState(false);
  const [serviceType, setServiceType] = useState('HOME_SERVICE');

  const timeOptions = [
    { label: '9:00 am', value: '9:00 am' },
    { label: '10:00 am', value: '10:00 am' },
    { label: '11:00 am', value: '11:00 am' },
    { label: '12:00 pm', value: '12:00 pm' },
  ];
  const upfrontOptions = [
    { label: '0', value: '0' },
    { label: '25', value: '25' },
    { label: '50', value: '50' },
    { label: '75', value: '75' },
    { label: '100', value: '100' },
  ];

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

  const handleBookService = () => {

    const isoString = mergeDateAndTimeToISO(date, time);

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

    handleBookAppointment(payload)
  }

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
            <Text className="text-lg font-bold mb-1">{service?.serviceName || 'Service Name'}</Text>
            <Text className="text-gray-500 mb-1">XYZ Studios</Text>
            <Text className="text-gray-700 mb-1">${service?.minimumPrice} - ${service?.maximumPrice}</Text>
            <Text className="text-gray-600 mb-2">{service?.serviceDescription || 'No description provided.'}</Text>
            {/* Service type buttons */}
            <View className="flex-row mb-3">
              <TouchableOpacity
                className={`flex-1 mr-2 py-3 rounded-md border ${serviceType === 'HOME_SERVICE' ? 'bg-primary-300' : 'bg-white border-gray-300'}`}
                onPress={() => setServiceType('HOME_SERVICE')}
              >
                <Text className={`text-center ${serviceType === 'HOME_SERVICE' ? 'text-white font-semibold' : 'text-gray-700'}`}>Home service</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 py-3 rounded-md border ${serviceType === 'VISIT_PROVIDER' ? 'bg-primary-300 text-white font-normal' : 'bg-white border-gray-300'}`}
                onPress={() => setServiceType('VISIT_PROVIDER')}
              >
                <Text className={`text-center ${serviceType === 'VISIT_PROVIDER' ? 'text-white font-semibold' : 'text-gray-700'}`}>Visit service provider</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Address */}
          <View className="mb-2 flex-row justify-between items-center">
            <Text className="text-base font-semibold">Your address</Text>
            <TouchableOpacity><Text className="text-primary-600 font-medium">Change address</Text></TouchableOpacity>
          </View>
          <TextInput value={address} onChangeText={setAddress} placeholder="Enter your address" />

          {/* Date and Time */}
          <View className="flex-row mb-2 gap-2">
            <View className="flex-1">
              <TextInput label="Select date" value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" />
            </View>
            <View className="flex-1">
              <Select label="Select time" value={time} options={timeOptions} onSelect={v => setTime(v.toString())} />
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
      {isBookingPending && (
        <View className="absolute inset-0 bg-black/50 items-center justify-center">
          <LoadingState isLoading={isBookingPending} />
        </View>
      )}
    </SafeAreaView>
  )
}