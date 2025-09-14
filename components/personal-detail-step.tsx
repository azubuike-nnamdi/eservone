import { useOnboardingStore } from "@/store/onboarding-store";
import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import Button from "./common/button";
import CountryDropdown from "./common/country-dropdown";
import KeyboardAwareScrollView from "./common/keyboard-aware-scroll-view";

export const PersonalDetailsStep = ({
  onNext
}: {
  onNext: () => void
}) => {
  const { data, setPersonalDetails } = useOnboardingStore();
  const [firstName, setFirstName] = useState(data.personalDetails.firstName);
  const [lastName, setLastName] = useState(data.personalDetails.lastName);
  const [country, setCountry] = useState(data.personalDetails.country);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    country?: string;
  }>({});

  // Update local state when store data changes
  useEffect(() => {
    setFirstName(data.personalDetails.firstName);
    setLastName(data.personalDetails.lastName);
    setCountry(data.personalDetails.country);
  }, [data.personalDetails]);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!country) {
      newErrors.country = "Please select your country";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setPersonalDetails({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        country
      });
      onNext();
    }
  };

  return (
    <KeyboardAwareScrollView className="flex-1">
      <View className="flex-1">
        <View className="mb-4">
          <Text className="text-base mb-2 text-black">First name</Text>
          <TextInput
            className={`w-full h-14 border ${errors.firstName ? 'border-danger' : 'border-gray-200'} rounded-md px-4`}
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              if (errors.firstName) {
                setErrors(prev => ({ ...prev, firstName: undefined }));
              }
            }}
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <Text className="text-danger text-sm mt-1">{errors.firstName}</Text>
          )}
        </View>

        <View className="mb-4">
          <Text className="text-base mb-2 text-black">Last name</Text>
          <TextInput
            className={`w-full h-14 border ${errors.lastName ? 'border-danger' : 'border-gray-200'} rounded-md px-4`}
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              if (errors.lastName) {
                setErrors(prev => ({ ...prev, lastName: undefined }));
              }
            }}
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <Text className="text-danger text-sm mt-1">{errors.lastName}</Text>
          )}
        </View>

        <CountryDropdown
          value={country}
          onSelect={(selectedCountry) => {
            setCountry(selectedCountry);
            if (errors.country) {
              setErrors(prev => ({ ...prev, country: undefined }));
            }
          }}
          label="Country"
          error={errors.country}
        />

        <Button
          onPress={handleNext}
          disabled={!firstName.trim() || !lastName.trim() || !country}
        >
          Next
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
};