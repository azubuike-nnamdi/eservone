import ProfileHeader from "@/components/common/profile-header";
import SearchBar from "@/components/common/search-bar";
import { useGetAccountBalance } from "@/hooks/query/useGetAccountBalance";
import useGetUserProfileDetails from "@/hooks/query/useGetUserProfileDetails";
import { getGreeting } from "@/lib/helper";
import { useAuthStore } from "@/store/auth-store";
import { useRecentSearchesStore } from "@/store/recent-searches-store";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useState } from 'react';
import {
   ActivityIndicator,
   KeyboardAvoidingView,
   Platform,
   RefreshControl,
   ScrollView,
   Text,
   TouchableOpacity,
   View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ServiceSeekerHomepage() {
   const router = useRouter();
   const { user } = useAuthStore();
   const recentSearches = useRecentSearchesStore((s) => s.recent);
   const clearRecent = useRecentSearchesStore((s) => s.clear);
   const { data: accountBalance, isPending: isAccountBalancePending, refetch: refetchBalance } = useGetAccountBalance();
   const { refetch: refetchUserProfile } = useGetUserProfileDetails();
   const [showBalance, setShowBalance] = useState(false);
   const [refreshing, setRefreshing] = useState(false);


   const onRefresh = useCallback(async () => {
      setRefreshing(true);
      try {
         await Promise.all([
            refetchBalance(),
            refetchUserProfile(),
         ]);
      } finally {
         setRefreshing(false);
      }
   }, [refetchBalance, refetchUserProfile]);

   // Handler to go to search page with a pre-filled term
   const handleRecentPress = (term: string) => {
      router.push({
         pathname: "/(root)/search",
         params: { q: term }
      });
   };

   return (
      <SafeAreaView className="flex-1 bg-white">
         <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
         >
            <ScrollView
               showsVerticalScrollIndicator={false}
               contentContainerClassName="pb-32"
               refreshControl={
                  <RefreshControl
                     refreshing={refreshing}
                     onRefresh={onRefresh}
                     colors={['#7C6AED', '#3E3F93']}
                     tintColor="#7C6AED"
                     progressBackgroundColor="#ffffff"
                     progressViewOffset={10}
                  />
               }
            >
               <ProfileHeader
                  title="Hire a service"
                  showNotification={false}
                  showBackArrow={false}
               />
               <View className="px-7">

                  <View className="flex-row items-baseline mt-4">
                     <Text className="text-2xl font-bold">{getGreeting()},</Text>
                     <Text className="text-2xl text-black-300/50 font-medium ml-1">
                        {user?.firstName}
                     </Text>
                  </View>

                  {/* Account Balance Card */}
                  <View className=" rounded-xl p-4 mt-4 mb-6 border border-gray-200">
                     <Text className="text-start text-lg text-gray-500 mb-2">Account Balance:</Text>
                     <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center justify-center">
                           <Text className="text-base font-bold mr-2">{accountBalance?.data?.currency || ''}</Text>
                           {isAccountBalancePending ? (
                              <Text className="text-2xl font-normal text-black/50">****</Text>
                           ) : showBalance ? (
                              <Text className="text-2xl font-semibold text-black">{Number(accountBalance?.data?.accountBalance).toLocaleString()}</Text>
                           ) : (
                              <Text className="text-5xl font-normal text-black tracking-widest">{'*'.repeat(6)}</Text>
                           )}
                        </View>
                        <TouchableOpacity
                           onPress={() => setShowBalance((prev) => !prev)}
                           className="ml-4 border border-gray-300 rounded-lg p-2"
                           accessibilityLabel={showBalance ? 'Hide balance' : 'Show balance'}
                        >
                           <Ionicons name={showBalance ? 'eye-off-outline' : 'eye-outline'} size={24} color="#222" />
                        </TouchableOpacity>
                     </View>
                  </View>

                  {/* <View className="mt-4">
                     <Text className="text-[22px] text-black-300 font-rubikBold font-bold leading-8">
                        Find the right talent and {"\n"}take your ideas to the next
                        level.
                     </Text>
                     <Text className="text-base text-black-300 font-rubikLight">
                        No hassle, just great work.
                     </Text>
                  </View> */}

                  <View className="">
                     <Text className="text-base text-black-300 font-rubikLight mb-2">
                        What are you looking for?
                     </Text>
                     <View>
                        <SearchBar
                           onPress={() => router.push("/(root)/search")}
                           placeholder="Search for a movie"
                        />
                        {/* Recent Searches UI */}
                        {recentSearches?.length > 0 && (
                           <View className="mt-4">
                              <View className="flex-row justify-between items-center mb-2">
                                 <Text className="text-base font-bold">Recent searches:</Text>
                                 <Text
                                    className="text-base text-red-500 font-bold"
                                    onPress={clearRecent}
                                    style={{ color: "#FF3B30" }}
                                 >
                                    Clear
                                 </Text>
                              </View>
                              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                 {recentSearches.map((item, idx) => (
                                    <TouchableOpacity
                                       key={idx}
                                       onPress={() => handleRecentPress(item)}
                                       className="bg-gray-100 px-4 py-2 rounded-lg mr-2"
                                       style={{ minWidth: 80, alignItems: "center" }}
                                    >
                                       <Text className="text-blue-800 font-medium">{item}</Text>
                                    </TouchableOpacity>
                                 ))}
                              </ScrollView>
                           </View>
                        )}
                     </View>
                  </View>
               </View>
            </ScrollView>

            {/* Loading Overlay during refresh */}
            {refreshing && (
               <View className="absolute inset-0 bg-black/20 justify-center items-center z-50">
                  <View className="bg-white rounded-lg p-6 shadow-lg">
                     <ActivityIndicator size="large" color="#7C6AED" />
                     <Text className="text-gray-600 mt-3 font-medium">Refreshing...</Text>
                  </View>
               </View>
            )}
         </KeyboardAvoidingView>
      </SafeAreaView>
   );
}
