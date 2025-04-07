import icons from "@/constants/icons";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import Button from "../common/button";

export default function CertificateLanding() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName='flex-1 px-7 justify-center'
      >
        <View className="flex-col items-center justify-center px-4">
          <Image source={icons.certProfileIcon} className="w-20 h-20 mb-4" />
          <Text className="text-2xl font-bold text-center mb-4">You haven't added any certificates</Text>
          <Text className="text-gray-500 text-center text-base leading-6 mb-8">
            Industrial certifications validate a service provider's skills, ensuring quality, trust, and industry compliance. They give professionals a competitive edge, open more job opportunities, and assure clients of safety and expertise. Certified providers stand out, build credibility, and attract more business.
          </Text>
          <Button
            variant="primary"
            onPress={() => { }}
            className="w-full bg-[#4338CA] py-4 rounded-lg"
          >
            <Text className="text-white text-center font-medium">Add a certificate</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
} 
