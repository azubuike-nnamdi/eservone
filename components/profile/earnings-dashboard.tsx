import icons from "@/constants/icons";
import { Ionicons } from '@expo/vector-icons'; // Assuming Ionicons are used for user/briefcase icons
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

// Define the type for an earning item
interface EarningItem {
  id: string;
  amount: number;
  currency: string;
  type: 'Initial payment' | 'Balance' | 'Full payment'; // Example types
  serviceName: string;
  customerName: string;
  date: string; // Keep as string for simplicity, could use Date object
}

// Dummy Data for Earnings History
const DUMMY_EARNINGS: EarningItem[] = [
  {
    id: '1',
    amount: 5000,
    currency: '₦', // Nigerian Naira symbol
    type: 'Initial payment',
    serviceName: 'Wig installation',
    customerName: 'John Doe',
    date: '24th Jan 2049',
  },
  {
    id: '2',
    amount: 50000,
    currency: '₦',
    type: 'Balance',
    serviceName: 'Wig installation',
    customerName: 'John Doe',
    date: '24th Jan 2049',
  },
  {
    id: '3',
    amount: 50000,
    currency: '₦',
    type: 'Balance',
    serviceName: 'Wig installation',
    customerName: 'John Doe',
    date: '24th Jan 2049',
  },
  {
    id: '4',
    amount: 50000,
    currency: '₦',
    type: 'Balance',
    serviceName: 'Wig installation',
    customerName: 'John Doe',
    date: '24th Jan 2049',
  },
  // Add more dummy items if needed
];

// --- Earning Item Component ---
const EarningItemCard = ({ item }: { item: EarningItem }) => {
  // Format amount with commas
  const formattedAmount = item.amount.toLocaleString('en-US');

  return (
    <View className="mb-6 border-b border-gray-100 pb-4">
      <View className="flex-row justify-between items-start mb-2">
        <View>
          <Text className="text-lg font-rubikMedium text-gray-800">
            {item.currency}{formattedAmount} - <Text className="text-gray-500 font-rubikRegular">[{item.type}]</Text>
          </Text>
        </View>
        <Text className="text-xs font-rubikRegular text-gray-400">{item.date}</Text>
      </View>
      <View className="flex-row items-center mb-1">
        <Ionicons name="briefcase-outline" size={16} color="#9CA3AF" style={{ marginRight: 6 }} />
        <Text className="text-sm text-gray-600 font-rubikRegular">{item.serviceName}</Text>
      </View>
      <View className="flex-row items-center">
        <Ionicons name="person-outline" size={16} color="#9CA3AF" style={{ marginRight: 6 }} />
        <Text className="text-sm text-gray-600 font-rubikRegular">{item.customerName}</Text>
      </View>
    </View>
  );
};

// --- Header Component for FlatList ---
const ListHeader = () => (
  <View>
    {/* Wallet Balance Card */}
    <View className="flex-row items-center justify-between p-8 bg-[#ECECF5] rounded-lg mb-6">
      <View className="">
        <Text className="text-md font-normal text-[#3E3F93]">EserveOne Wallet Balance:</Text>
        {/* TODO: Replace KES 10,000 with actual data */}
        <Text className="text-2xl py-2 font-bold text-[#3E3F93]">₦23,000.00</Text>
        <View className="flex-row items-center gap-2">
          <Text className="text-md font-semibold text-[#3E3F93]/50">Last payment received:</Text>
          {/* TODO: Replace date with actual data */}
          <Text className="text-md font-semibold text-[#3E3F93]">24th Aug, 2024</Text>
        </View>
      </View>
      <View>
        <Image source={icons.rightArrow} className="w-6 h-6" />
      </View>
    </View>

    {/* Earnings History Title */}
    <Text className="text-lg font-rubikMedium text-black mb-4">Earnings history:</Text>
  </View>
);

export default function EarningsDashboard() {
  return (
    <FlatList
      className="flex-1 bg-white"
      data={DUMMY_EARNINGS}
      renderItem={({ item }) => <EarningItemCard item={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={ListHeader} // Use the header component
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContentContainer} // Apply padding via style
    // ListFooterComponent={<View style={{ height: 20 }} />} // Optional: Add space at the bottom
    />
  )
}

// Styles for FlatList padding
const styles = StyleSheet.create({
  listContentContainer: {
    paddingHorizontal: 24, // Corresponds to p-6
    paddingTop: 24,      // Corresponds to p-6
    paddingBottom: 48,   // Add extra padding at the bottom if needed
  }
}); 