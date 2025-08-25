import ProfileHeader from "@/components/common/profile-header";
import { useGetSubscriptionDetails } from "@/hooks/query/useGetSubscriptionDetails";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function SubscriptionDetails() {
  const { data, isPending, error } = useGetSubscriptionDetails()

  console.log('subscription details', data)

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
  const isActive = subscription.lastSubscriptionDate !== null;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <ProfileHeader title="Subscription Details" showNotification={false} />

        <View className="px-4 py-4">
          {/* Subscription Overview Card */}
          <View style={{ backgroundColor: '#7C6AED', borderRadius: 24, padding: 24, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              {/* Service Logo */}
              <View style={{ width: 80, height: 80, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' }}>
                <Ionicons name="business" size={36} color="white" />
              </View>

              {/* Subscription Info */}
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'white', marginBottom: 8 }}>
                  {subscription.isBusiness ? 'Business Plan' : 'Standard Plan'}
                </Text>
                <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>
                  {subscription.duration} • Premium Features
                </Text>
              </View>

              {/* Status Badge */}
              <View style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor: isActive ? 'rgba(34,197,94,0.9)' : 'rgba(255,255,255,0.2)',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.3)'
              }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                  {isActive ? '✓ Active' : 'Inactive'}
                </Text>
              </View>
            </View>

            {/* Decorative Elements */}
            <View style={{ position: 'absolute', top: 16, right: 16, width: 64, height: 64, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 32 }} />
            <View style={{ position: 'absolute', bottom: 16, left: 16, width: 32, height: 32, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 16 }} />
          </View>

          {/* Subscription Details */}
          <View style={{ backgroundColor: 'white', borderRadius: 24, padding: 24, marginBottom: 24, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, elevation: 4, }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
              <View style={{ width: 40, height: 40, backgroundColor: '#DBEAFE', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                <Ionicons name="information-circle" size={24} color="#3B82F6" />
              </View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937' }}>Subscription Information</Text>
            </View>

            <View style={{ marginTop: 20 }}>
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
                  <Text style={{ color: '#6B7280', fontSize: 16 }}>Billing Cycle</Text>
                </View>
                <Text style={{ color: '#1F2937', fontWeight: '600', fontSize: 16 }}>{subscription.duration}</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="checkmark-circle" size={20} color={isActive ? "#10B981" : "#6B7280"} style={{ marginRight: 8 }} />
                  <Text style={{ color: '#6B7280', fontSize: 16 }}>Status</Text>
                </View>
                <Text style={{ fontWeight: '600', fontSize: 16, color: isActive ? '#10B981' : '#6B7280' }}>
                  {isActive ? 'Active' : 'No Active Subscription'}
                </Text>
              </View>
            </View>
          </View>

          {/* Last Subscription Date */}
          {subscription.lastSubscriptionDate && (
            <View style={{ backgroundColor: '#F0FDF4', borderRadius: 24, padding: 24, marginBottom: 24, borderWidth: 1, borderColor: '#D1FAE5' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <View style={{ width: 40, height: 40, backgroundColor: '#D1FAE5', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                  <Ionicons name="time" size={24} color="#059669" />
                </View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937' }}>Last Subscription</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="calendar-outline" size={20} color="#059669" style={{ marginRight: 8 }} />
                  <Text style={{ color: '#6B7280', fontSize: 16 }}>Last Payment</Text>
                </View>
                <Text style={{ color: '#1F2937', fontWeight: '600', fontSize: 16 }}>
                  {new Date(subscription.lastSubscriptionDate).toLocaleDateString()}
                </Text>
              </View>
            </View>
          )}

          {/* Action Buttons */}
          <View style={{ marginTop: 16, marginBottom: 32 }}>
            {isActive ? (
              <TouchableOpacity style={{ backgroundColor: '#EF4444', paddingVertical: 20, borderRadius: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name="close-circle" size={24} color="white" style={{ marginRight: 8 }} />
                  <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>
                    Cancel Subscription
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={{ backgroundColor: '#7C6AED', paddingVertical: 20, borderRadius: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name="add-circle" size={24} color="white" style={{ marginRight: 8 }} />
                  <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>
                    Subscribe Now
                  </Text>
                </View>
              </TouchableOpacity>
            )}

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}