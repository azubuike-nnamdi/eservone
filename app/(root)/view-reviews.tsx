import ProfileHeader from "@/components/common/profile-header";
import {
  calculateRatingStats,
  CommentsHeader,
  ErrorState,
  LoadingState,
  RatingSummary,
  ReviewsList
} from "@/components/reviews";
import { useGetAllReviews } from "@/hooks/query/useGetReviews";
import { useAuthStore } from "@/store/auth-store";
import { SafeAreaView, ScrollView } from "react-native";

export default function ViewReviews() {
  const { user } = useAuthStore();
  const { data: reviewsData, isPending, error, isError, refetch } = useGetAllReviews({
    providerEmail: user?.email ?? ""
  });

  const reviews = reviewsData?.data || [];
  const ratingStats = calculateRatingStats(reviews);


  if (isPending) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <ProfileHeader title='Reviews' showNotification={false} showCurrency={true} showBackArrow={true} />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <RatingSummary ratingStats={ratingStats} />
        <CommentsHeader ratingStats={ratingStats} />
        <ReviewsList reviews={reviews} />
      </ScrollView>
    </SafeAreaView>
  );
}