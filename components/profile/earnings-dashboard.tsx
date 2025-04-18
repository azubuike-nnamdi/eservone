import icons from "@/constants/icons";
import { Image, Text, View } from "react-native";

export default function EarningsDashboard() {
  return (
    <View className="flex-1 bg-white">
      <View className="p-6">
        <View className="flex-row items-center justify-between p-8 bg-[#ECECF5]  rounded-lg">
          <View className="">
            <Text className="text-md font-normal text-[#3E3F93]">EserveOne Wallet Balance:</Text>
            <Text className="text-2xl py-2 font-bold text-[#3E3F93]">KES 10,000</Text>
            <View className="flex-row items-center gap-2">
              <Text className="text-md font-semibold text-[#3E3F93]/50">Last payment received:</Text>
              <Text className="text-md font-semibold text-[#3E3F93]">24th Aug, 2024</Text>
            </View>
          </View>
          <View>
            <Image source={icons.rightArrow} className="w-6 h-6" />
          </View>
        </View>

        {/* Earnings History */}
        <View className=" py-6">
          <Text className="text-xl font-bold text-black">Earnings History:</Text>
        </View>
      </View>
    </View>
  )
} 