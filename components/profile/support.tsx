
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { Linking, Text, TouchableOpacity, View } from "react-native";

export default function ProfileSupport() {

  const handleEmailPress = () => {
    Linking.openURL('mailto:support@eservone.onmicrosoft.com');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:+11234567890');
  };
  return (
    <View>
      {/* Icon */}
      <View className="items-start mb-6 py-5">
        <View className="w-20 h-20 rounded-full bg-gray-200 items-center justify-center">
          <FontAwesome5 name="headset" size={32} color="#4338ca" />
        </View>
      </View>

      {/* Heading */}
      <Text className="text-2xl font-bold text-black mb-3">We're here to help!</Text>

      {/* Description */}
      <Text className="text-base text-gray-500 mb-3">
        At eservone, we’re committed to providing you with the best possible experience. If you have any questions, concerns, or need assistance, our support team is just a message or call away.
      </Text>

      {/* Support Options */}
      <View className="mb-6">
        {/* Email Support */}
        <View className="mb-5">
          <Text className="text-lg font-bold text-black">1. Email support:</Text>
          <Text className="text-base text-gray-600 mb-2">
            For general inquiries, technical issues, or account-related questions, please email us at:
          </Text>
          <TouchableOpacity onPress={handleEmailPress}>
            <Text className="text-indigo-700 font-medium">support@eservone.onmicrosoft.com</Text>
          </TouchableOpacity>
          <Text className="text-base text-gray-600 mt-2">
            Our team will respond to your email within 24-48 hours.
          </Text>
        </View>

        {/* Phone Support */}
        <View>
          <Text className="text-lg font-bold text-black">2. Phone support:</Text>
          <Text className="text-base text-gray-600 mb-2">
            If you prefer to speak with someone directly, call our support team at:
          </Text>
          <TouchableOpacity onPress={handlePhonePress}>
            <Text className="text-indigo-700 font-medium">+1 (123) 456-7890</Text>
          </TouchableOpacity>
          <Text className="text-base text-gray-600 mt-2">
            Our phone lines are open Monday to Friday, 9:00 AM to 6:00 PM [Your Time Zone].
          </Text>
        </View>
      </View>

      {/* Additional Information */}
      <View className="bg-white p-5 rounded-lg shadow-sm mb-6">
        <Text className="text-base text-gray-800 mb-3">
          To help us assist you faster, please include the following details in your email or mention them during your call:
        </Text>
        <View className="ml-2">
          <View className="flex-row mb-2">
            <Text className="text-gray-800 mr-2">•</Text>
            <Text className="text-gray-800">Your full name</Text>
          </View>
          <View className="flex-row mb-2">
            <Text className="text-gray-800 mr-2">•</Text>
            <Text className="text-gray-800">Your account email address</Text>
          </View>
          <View className="flex-row mb-2">
            <Text className="text-gray-800 mr-2">•</Text>
            <Text className="text-gray-800">A brief description of the issue or question</Text>
          </View>
          <View className="flex-row">
            <Text className="text-gray-800 mr-2">•</Text>
            <Text className="text-gray-800">Screenshots or error messages (if applicable)</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
