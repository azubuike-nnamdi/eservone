import ProfileHeader from "@/components/common/profile-header";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function SubscriptionDetails() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName=''>
        <ProfileHeader title='Subscription details' showNotification={false} />

        <View className='px-7'>
          <Text>Subscription Details</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}