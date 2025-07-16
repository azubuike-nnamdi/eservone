import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function ThankYou() {
  const router = useRouter();
  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</Text>
      <Text className="text-lg text-center text-gray-700 mb-8">Thank you for topping up your wallet. Your payment was successful.</Text>
      <TouchableOpacity
        className="bg-primary-500 rounded-lg px-8 py-3"
        onPress={() => router.push('/')}
      >
        <Text className="text-white text-lg font-bold">Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
} 