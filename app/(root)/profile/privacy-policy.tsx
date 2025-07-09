import ProfileHeader from '@/components/common/profile-header'
import SectionCard from '@/components/common/section-card'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PrivacyPolicy() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName=''>
        <ProfileHeader title='Privacy policy' showNotification={false} />

        <View className='px-7'>
          <SectionCard
            title="Eservone’s Privacy Policy"
            description="Last updated: December 2024"
            paragraphs={[
              "You are solely responsible for the content you post, including project descriptions, bids, and communications. You agree not to engage in any activity that violates applicable laws, infringes on intellectual property rights, or harms other users. eservone reserves the right to suspend or terminate accounts that violate these Terms.",
              "eservone charges a service fee for transactions conducted through the Platform. Fees will be clearly disclosed before you engage in any transaction. You are responsible for paying all applicable taxes and fees associated with your use of the Platform."
            ]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
