import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Checkbox from "../common/check-box";
import CustomDateTimePicker from "../common/custom-date-time-picker";
import KeyboardAwareScrollView from "../common/keyboard-aware-scroll-view";
import Select from "../common/select";
import TextInput from "../common/text-input";

interface BookingFormProps {
  address: string;
  isAddressEditable: boolean;
  isHomeService: boolean;
  isWalkInService: boolean;
  onAddressChange: (address: string) => void;
  onAddressEditabilityChange: (editable: boolean) => void;
  date: Date;
  time: string;
  buzzCode: string;
  upfront: string;
  details: string;
  hasPets: boolean;
  costOfService?: string;
  costError?: string;
  onDateChange: (date: Date) => void;
  onTimeChange: (time: string) => void;
  onBuzzCodeChange: (code: string) => void;
  onUpfrontChange: (upfront: string) => void;
  onDetailsChange: (details: string) => void;
  onHasPetsChange: (hasPets: boolean) => void;
  onCostOfServiceChange?: (cost: string) => void;
  timeOptions: { label: string; value: string }[];
  upfrontOptions: { label: string; value: string }[];
  minPrice?: string;
  maxPrice?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({
  address,
  isAddressEditable,
  isHomeService,
  isWalkInService,
  onAddressChange,
  onAddressEditabilityChange,
  date,
  time,
  buzzCode,
  upfront,
  details,
  hasPets,
  // costOfService,
  costError,
  onDateChange,
  onTimeChange,
  onBuzzCodeChange,
  onUpfrontChange,
  onDetailsChange,
  onHasPetsChange,
  // onCostOfServiceChange,
  timeOptions,
  upfrontOptions,
  // minPrice,
  // maxPrice,
}) => {
  return (
    <KeyboardAwareScrollView className="flex-1">
      {/* Address */}
      <View className="mb-2 flex-row justify-between items-center">
        <Text className="text-base font-semibold">
          {isHomeService ? 'Your address' : 'Service provider address'}
        </Text>
        {isHomeService && (
          <TouchableOpacity onPress={() => onAddressEditabilityChange(!isAddressEditable)}>
            <Text className="text-primary-300 font-semibold">
              {isAddressEditable ? 'Done' : 'Change address'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <TextInput
        value={address}
        onChangeText={onAddressChange}
        placeholder="Enter your address"
        editable={isHomeService && isAddressEditable}
        pointerEvents={isWalkInService ? 'none' : 'auto'}
      />

      {/* Cost of Service */}
      {/* <TextInput
        label={`Cost of service (${minPrice} - ${maxPrice})`}
        value={costOfService}
        onChangeText={onCostOfServiceChange}
        placeholder="Enter amount"
        keyboardType="numeric"
        error={costError}
      /> */}

      {/* Date and Time */}
      <View className="flex-row mb-2 gap-2">
        <View className="flex-1">
          <CustomDateTimePicker
            label="Select date"
            value={date}
            onChange={onDateChange}
            placeholder="Select date"
            minimumDate={new Date()}
          />
        </View>
        <View className="flex-1">
          <Select
            label="Select time"
            value={time}
            options={timeOptions}
            onSelect={v => onTimeChange(v.toString())}
          />
        </View>
      </View>

      {/* Buzz code and Upfront payment */}
      <View className="flex-row mb-2 gap-2">
        <View className="flex-1">
          <TextInput
            label="Buzz code (optional)"
            value={buzzCode}
            onChangeText={onBuzzCodeChange}
            placeholder="Enter buzz code (optional)"
          />
        </View>
        <View className="flex-1">
          <Select
            label="Upfront payment (%)"
            value={upfront}
            options={upfrontOptions}
            onSelect={v => onUpfrontChange(v.toString())}
          />
        </View>
      </View>

      {/* Additional details */}
      <TextInput
        label="Additional details"
        value={details}
        onChangeText={onDetailsChange}
        placeholder="Start typing ..."
        multiline
        numberOfLines={4}
        inputClassName="h-24"
      />

      {/* Pets checkbox */}
      {isHomeService && (
        <Checkbox
          label="Do you have pets?"
          checked={hasPets}
          onChange={onHasPetsChange}
        />
      )}
    </KeyboardAwareScrollView>
  );
};

export default BookingForm;
