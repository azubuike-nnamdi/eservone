import ProfileHeader from '@/components/common/profile-header'
import SectionCard from '@/components/common/section-card'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function TermsOfServices() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName=''>
        <ProfileHeader title='Terms of services' showNotification={false} />

        <View className='px-7'>
          <SectionCard
            title="EserveOne's Terms of service"
            description="Last updated: 2025-04-07"
            paragraphs={[
              "By accessing or using EserveOne ('the Platform'), you agree to be bound by these Terms of Service ('Terms'). If you do not agree to these Terms, you may not use the Platform. These Terms govern your use of the Platform, including but not limited to creating an account, posting projects, bidding on jobs, and communicating with other users.",
              "To use the Platform, you must be at least 18 years old and capable of forming a binding contract. By using the Platform, you represent and warrant that you meet these eligibility requirements."
            ]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
