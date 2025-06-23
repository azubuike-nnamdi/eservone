import ProfileHeader from "@/components/common/profile-header";
import SearchBar from "@/components/common/search-bar";
import { getGreeting } from "@/lib/helper";
import { useAuthStore } from "@/store/auth-store";
import { useRecentSearchesStore } from "@/store/recent-searches-store";
import { useRouter } from "expo-router";
import {
   KeyboardAvoidingView,
   Platform,
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
            >
               <ProfileHeader
                  title="Hire a service"
                  showNotification={true}
                  showBackArrow={false}
               />
               <View className="px-7">
                  <View className="flex-row items-baseline mt-4">
                     <Text className="text-2xl font-bold">{getGreeting()},</Text>
                     <Text className="text-2xl text-black-300/50 font-medium ml-1">
                        {user?.firstName}
                     </Text>
                  </View>

                  <View className="mt-4">
                     <Text className="text-[22px] text-black-300 font-rubikBold font-bold leading-8">
                        Find the right talent and {"\n"}take your ideas to the next
                        level.
                     </Text>
                     <Text className="text-base text-black-300 font-rubikLight">
                        No hassle, just great work.
                     </Text>
                  </View>

                  <View className="mt-12">
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
         </KeyboardAvoidingView>
      </SafeAreaView>
   );
}
