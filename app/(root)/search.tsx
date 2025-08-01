import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import ProfileHeader from "@/components/common/profile-header";
import SearchBar from "@/components/common/search-bar";
import SeekerServiceCard from "@/components/services/seeker-service-card";
import { Service } from "@/constants/types";
import { useCurrency } from '@/context/currency-context';
import useGetAllServices from "@/hooks/query/useGetAllServices";
import useSearchServices from "@/hooks/query/useSearchServices";
import { useDebounce } from "@/lib/helper";
import { useRecentSearchesStore } from "@/store/recent-searches-store";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery.toLowerCase(), 500);
  const router = useRouter();
  const addRecentSearch = useRecentSearchesStore((s) => s.addSearch);
  const { format } = useCurrency();


  const { data: allServicesData, isPending: allPending, error: allError } = useGetAllServices();
  const { data: searchData, isPending: searchPending, error: searchError } = useSearchServices(
    debouncedSearchQuery
  );


  const isSearching = !!debouncedSearchQuery.trim();
  const services: Service[] | undefined = isSearching
    ? searchData?.data
    : allServicesData?.data;

  const isPending = isSearching ? searchPending : allPending;
  const error = isSearching ? searchError : allError;

  // // Debug logging
  // console.log('🔍 Search Debug:', {
  //   searchQuery,
  //   debouncedSearchQuery,
  //   isSearching,
  //   searchDataLength: searchData?.data?.length,
  //   allServicesLength: allServicesData?.data?.length,
  //   servicesLength: services?.length,
  //   searchError: searchError?.message
  // });


  // Add to recent searches when a real search is performed
  useEffect(() => {
    if (
      debouncedSearchQuery &&
      debouncedSearchQuery !== 'all' &&
      debouncedSearchQuery.trim() !== ''
    ) {
      addRecentSearch(debouncedSearchQuery.trim());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery]);

  const handleServicePress = (id: string) => {
    router.push(`/products/${id}`);
  };

  // const handleRecentPress = (term: string) => {
  //   setSearchQuery(term);
  // };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ProfileHeader title="Search" showNotification={false} showBackArrow={true} />
      <View className="flex-1 ">
        <FlatList
          data={services}
          renderItem={({ item }) => {
            const formattedMinPrice = format(item.minimumPrice);
            const formattedMaxPrice = format(item.maximumPrice);

            return (
              <SeekerServiceCard
                {...item}
                title={item.serviceName}
                serviceDeliveryType={item.serviceDeliveryType}
                priceRange={`${formattedMinPrice} - ${formattedMaxPrice}`}
                currency={item.currency}
                ratingCount={parseInt(item.ratingCount) || 0}
                reviewCount={item.reviewCount || 0}
                onPress={() => handleServicePress(item.id.toString())}
              />
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          className="px-3 w-full"

          contentContainerStyle={{ paddingBottom: 100 }}
          ListHeaderComponent={
            <>
              <View className="my-4">
                <SearchBar
                  placeholder="Search for a service"
                  value={searchQuery}
                  onChangeText={(text: string) => setSearchQuery(text)}
                />
                {/* Recent Searches */}
                {/* {recentSearches.length > 0 && (
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
                )} */}
              </View>

              {(isPending) && (
                <LoadingSkeleton count={3} />
              )}
              {(error) && (
                <Text className="text-red-500 text-center text-lg">
                  {error?.message}
                </Text>
              )}

              {!isPending && !error && searchQuery.trim() && (
                <Text className="text-md text-black mb-3 font-bold">
                  Search Results for:{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}

              {!isPending && !error && !searchQuery.trim() && (
                <Text className="text-md text-black mb-3 font-bold">
                  All Services
                </Text>
              )}
            </>
          }
          ListEmptyComponent={
            !isPending && !error ? (
              <View className="mt-10 px-5">
                <Text className="text-gray-400 text-center">
                  {searchQuery.trim() ? 'No services found' : 'No services available'}
                </Text>
              </View>
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  )
}