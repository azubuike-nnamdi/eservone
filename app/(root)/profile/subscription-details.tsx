import ProfileHeader from "@/components/common/profile-header";
import { CREATE_BUSINESS } from "@/constants/routes";
import { useGetSubscriptionDetails } from "@/hooks/query/useGetSubscriptionDetails";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function SubscriptionDetails() {
  const { data, isPending, error } = useGetSubscriptionDetails()

  // console.log('subscription details', data)

  if (isPending) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <ProfileHeader title="Subscription Details" showNotification={false} />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#7C6AED" />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !data?.data) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <ProfileHeader title="Subscription Details" showNotification={false} />
        <View className="flex-1 justify-center items-center px-7">
          <Text className="text-red-500 text-center text-lg font-semibold mb-2">
            Failed to load subscription details
          </Text>
          <Text className="text-gray-600 text-center">
            Please try again later
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const subscription = data.data;
  const isActive = subscription.isBusiness || subscription.lastSubscriptionDate !== null;

  // Calculate next subscription date (one month after last date)
  const getNextSubscriptionDate = (lastDate: number[]) => {
    if (!lastDate || lastDate.length !== 3) return null;
    const [year, month, day] = lastDate;
    const lastSubscriptionDate = new Date(year, month - 1, day); // month is 0-indexed
    const nextDate = new Date(lastSubscriptionDate);
    nextDate.setMonth(nextDate.getMonth() + 1);
    return nextDate;
  };

  const nextSubscriptionDate = subscription.lastSubscriptionDate
    ? getNextSubscriptionDate(subscription.lastSubscriptionDate)
    : null;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <ProfileHeader title="Subscription Details" showNotification={false} />

        <View className="px-4 py-4">
          {/* Subscription Plan Card */}
          <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 20, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 4 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 }}>Subscription Plan</Text>

            {/* Plan Card */}
            <View style={{ backgroundColor: '#F9FAFB', borderRadius: 12, padding: 16, marginBottom: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <View style={{ width: 40, height: 40, backgroundColor: '#E5E7EB', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                  <Ionicons name="business" size={20} color="#6B7280" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 4 }}>
                    {subscription.isBusiness ? 'Business Plan' : 'Basic Plan'}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: isActive ? '#10B981' : '#EF4444', marginRight: 6 }} />
                    <Text style={{ fontSize: 14, color: '#1F2937' }}>
                      {isActive ? 'Active' : 'Inactive'}
                    </Text>
                  </View>
                </View>
              </View>

              {isActive && nextSubscriptionDate && (
                <Text style={{ fontSize: 14, color: '#6B7280' }}>
                  Next billing cycle: {nextSubscriptionDate.toLocaleDateString()}
                </Text>
              )}

              {!isActive && (
                <Text style={{ fontSize: 14, color: '#6B7280' }}>
                  Upgrade to Business Plan for premium services
                </Text>
              )}
            </View>
          </View>

          {/* Subscription Details */}
          <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 20, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 4 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 }}>Subscription Information</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="card" size={20} color="#6B7280" style={{ marginRight: 8 }} />
                <Text style={{ color: '#6B7280', fontSize: 16 }}>Plan Type</Text>
              </View>
              <Text style={{ color: '#1F2937', fontWeight: '600', fontSize: 16 }}>
                {subscription.isBusiness ? 'Business' : 'Standard'}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="calendar" size={20} color="#6B7280" style={{ marginRight: 8 }} />
                <Text style={{ color: '#6B7280', fontSize: 16 }}>Billing</Text>
              </View>
              <Text style={{ color: '#1F2937', fontWeight: '600', fontSize: 16 }}>{subscription.duration}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="remove-circle" size={20} color="#6B7280" style={{ marginRight: 8 }} />
                <Text style={{ color: '#6B7280', fontSize: 16 }}>Status</Text>
              </View>
              <Text style={{ fontWeight: '600', fontSize: 16, color: isActive ? '#10B981' : '#6B7280' }}>
                {isActive ? 'Active Subscription' : 'No Active Subscription'}
              </Text>
            </View>
          </View>

          {/* Subscription Dates */}
          {subscription.lastSubscriptionDate && (
            <View style={{ backgroundColor: '#F0FDF4', borderRadius: 24, padding: 24, marginBottom: 24, borderWidth: 1, borderColor: '#D1FAE5' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <View style={{ width: 40, height: 40, backgroundColor: '#D1FAE5', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                  <Ionicons name="time" size={24} color="#059669" />
                </View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937' }}>Subscription Dates</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#D1FAE5' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="calendar-outline" size={20} color="#059669" style={{ marginRight: 8 }} />
                  <Text style={{ color: '#6B7280', fontSize: 16 }}>Last Payment</Text>
                </View>
                <Text style={{ color: '#1F2937', fontWeight: '600', fontSize: 16 }}>
                  {(() => {
                    const [year, month, day] = subscription.lastSubscriptionDate;
                    return new Date(year, month - 1, day).toLocaleDateString();
                  })()}
                </Text>
              </View>

              {nextSubscriptionDate && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="calendar" size={20} color="#059669" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#6B7280', fontSize: 16 }}>Next Payment</Text>
                  </View>
                  <Text style={{ color: '#1F2937', fontWeight: '600', fontSize: 16 }}>
                    {nextSubscriptionDate.toLocaleDateString()}
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Action Buttons */}
          <View style={{ marginTop: 16, marginBottom: 32 }}>
            {isActive ? (
              <TouchableOpacity style={{ backgroundColor: '#7C6AED', paddingVertical: 16, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 4 }}>
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>
                  Cancel Subscription
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ backgroundColor: '#7C6AED', paddingVertical: 16, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 4 }}
                onPress={() => router.push(CREATE_BUSINESS)}
              >
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>
                  Subscribe Now
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}