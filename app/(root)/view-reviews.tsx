import ProfileHeader from "@/components/common/profile-header";
import { useGetAllReviews } from "@/hooks/query/useGetReviews";
import { useAuthStore } from "@/store/auth-store";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface Review {
  content: string;
  commentCreatedBy: number;
  serviceAppointmentId: string | null;
  serviceId: string;
  rating: number | null;
  serviceProviderEmail: string;
}

export default function ViewReviews() {
  const { user } = useAuthStore();
  const { data: reviewsData, isPending, error, isError } = useGetAllReviews({ providerEmail: user?.email ?? "" })
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');

  const reviews = reviewsData?.data || [];

  // Calculate rating statistics
  const calculateRatingStats = () => {
    const totalReviews = reviews.length;
    const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let totalRating = 0;
    let ratedReviews = 0;

    reviews.forEach((review: Review) => {
      if (review.rating) {
        ratingCounts[review.rating as keyof typeof ratingCounts]++;
        totalRating += review.rating;
        ratedReviews++;
      }
    });

    const averageRating = ratedReviews > 0 ? (totalRating / ratedReviews).toFixed(1) : '0.0';
    const percentages = Object.keys(ratingCounts).reduce((acc, key) => {
      const rating = parseInt(key) as keyof typeof ratingCounts;
      acc[rating] = totalReviews > 0 ? Math.round((ratingCounts[rating] / totalReviews) * 100) : 0;
      return acc;
    }, {} as Record<number, number>);

    return { averageRating, ratingCounts, percentages, totalReviews };
  };

  const { averageRating, percentages, totalReviews } = calculateRatingStats();

  // Filter reviews based on selected rating
  const filteredReviews = selectedRating === 'all'
    ? reviews
    : reviews.filter((review: Review) => review.rating === selectedRating);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Ionicons key={i} name="star" size={16} color="#FFD700" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Ionicons key={i} name="star-half" size={16} color="#FFD700" />
        );
      } else {
        stars.push(
          <Ionicons key={i} name="star-outline" size={16} color="#D1D5DB" />
        );
      }
    }
    return stars;
  };

  const renderReviewItem = ({ item }: { item: Review }) => (
    <View className="bg-gray-50 rounded-lg p-4 mb-3 mx-4">
      <View className="flex-row items-start">
        {/* Profile Picture */}
        <View className="w-12 h-12 bg-gray-300 rounded-full items-center justify-center mr-3">
          <Text className="text-gray-600 font-bold text-lg">
            {item.commentCreatedBy.toString().charAt(0)}
          </Text>
        </View>

        {/* Review Content */}
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-gray-900 font-bold text-base">
              User #{item.commentCreatedBy}
            </Text>
            {item.rating && (
              <View className="flex-row items-center">
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text className="text-gray-700 font-semibold ml-1 text-sm">
                  {item.rating}
                </Text>
              </View>
            )}
          </View>

          <Text className="text-gray-500 text-sm mb-2">
            {new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </Text>

          <Text className="text-gray-800 text-base leading-5">
            {item.content}
          </Text>
        </View>
      </View>
    </View>
  );


  if (isPending) {
    return (
      <SafeAreaView className='flex-1 bg-gradient-to-b from-purple-50 to-blue-50'>
        <ProfileHeader title='Reviews' showNotification={false} showCurrency={true} showBackArrow={true} />
        <View className="flex-1 items-center justify-center">
          <View className=" items-center">
            <ActivityIndicator size="large" color="#7C6AED" />
            <Text className="text-gray-600 font-medium mt-4">Loading reviews...</Text>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  if (isError) {
    return (
      <SafeAreaView className='flex-1 bg-gradient-to-b from-purple-50 to-blue-50'>
        <ProfileHeader title='Reviews' showNotification={false} showCurrency={true} showBackArrow={true} />
        <View className="flex-1 items-center justify-center px-8">
          <View className="bg-white rounded-2xl p-8 shadow-lg items-center">
            <View className="bg-red-100 rounded-full p-4 mb-4">
              <Ionicons name="alert-circle" size={32} color="#EF4444" />
            </View>
            <Text className='text-red-500 text-center text-lg font-bold mb-2'>{error?.message}</Text>
            <Text className='text-gray-600 text-center mb-4'>Please try again later</Text>
            <View className="bg-red-50 px-4 py-2 rounded-full">
              <Text className="text-red-600 text-sm font-medium">⚠️ Check your connection</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ProfileHeader title='Reviews' showNotification={false} showCurrency={true} showBackArrow={true} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Rating Summary Section */}
        <View className="bg-white px-4 py-6">
          <View className="flex-row items-center justify-between mb-6">
            {/* Overall Rating */}
            <View className="flex-1">
              <Text className="text-4xl font-bold text-red-600 mb-2">
                {averageRating}
              </Text>
              <View className="flex-row items-center mb-2">
                {renderStars(parseFloat(averageRating))}
              </View>
              <Text className="text-gray-600 text-base">
                {totalReviews} reviews
              </Text>
            </View>

            {/* Rating Distribution */}
            <View className="flex-1 ml-6">
              {[5, 4, 3, 2, 1].map((rating) => (
                <View key={rating} className="flex-row items-center mb-2">
                  <View className="flex-row items-center w-8">
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text className="text-gray-700 font-medium ml-1 text-sm">
                      {rating}
                    </Text>
                  </View>
                  <View className="flex-1 mx-3">
                    <View className="h-2 bg-gray-200 rounded-full">
                      <View
                        className="h-2 bg-red-600 rounded-full"
                        style={{ width: `${percentages[rating]}%` }}
                      />
                    </View>
                  </View>
                  <Text className="text-gray-600 text-sm w-8">
                    {percentages[rating]}%
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Rating Filter Buttons */}
          <View className="flex-row space-x-2">
            {['all', 5, 4, 3, 2, 1].map((rating) => (
              <TouchableOpacity
                key={rating}
                onPress={() => setSelectedRating(rating as number | 'all')}
                className={`px-4 py-2 rounded-full flex-row items-center ${selectedRating === rating
                  ? 'bg-red-600'
                  : 'bg-gray-200'
                  }`}
              >
                <Ionicons
                  name="star"
                  size={16}
                  color={selectedRating === rating ? 'white' : 'black'}
                />
                <Text className={`ml-1 font-medium ${selectedRating === rating ? 'text-white' : 'text-black'
                  }`}>
                  {rating === 'all' ? 'All' : rating}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Comments Section Header */}
        <View className="px-4 py-4 bg-gray-50">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-gray-900">
              Comments
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="star" size={20} color="#FFD700" />
              <Text className="text-gray-700 font-semibold ml-1">
                {averageRating}
              </Text>
              <Text className="text-gray-500 ml-1">
                {totalReviews}
              </Text>
            </View>
          </View>
        </View>

        {/* Reviews List */}
        <View className="pb-8">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review: Review, index: number) => (
              <View key={`${review.commentCreatedBy}-${index}`}>
                {renderReviewItem({ item: review })}
              </View>
            ))
          ) : (
            <View className="items-center justify-center py-16 px-8">
              <Ionicons name="chatbubbles-outline" size={48} color="#D1D5DB" />
              <Text className="text-gray-500 text-lg font-medium mt-4">
                No reviews found
              </Text>
              <Text className="text-gray-400 text-center mt-2">
                {selectedRating === 'all'
                  ? 'No reviews available yet'
                  : `No ${selectedRating}-star reviews found`
                }
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}