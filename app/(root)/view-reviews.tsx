import ProfileHeader from "@/components/common/profile-header";
import {
  CommentsHeader,
  ErrorState,
  LoadingState,
  RatingSummary,
  ReviewsList
} from "@/components/reviews";
import { useGetRating } from "@/hooks/query/useGetRating";
import { useGetAllReviews } from "@/hooks/query/useGetReviews";
import { calculateActualDistribution } from "@/lib/rating-distribution-utils";
import { useAuthStore } from "@/store/auth-store";
import { SafeAreaView, ScrollView } from "react-native";

export default function ViewReviews() {
  const { user } = useAuthStore();
  const { data: reviewsData, isPending, error, isError, refetch } = useGetAllReviews({
    providerEmail: user?.email ?? ""
  });
  const { data: rating, isPending: ratingPending, isError: ratingError } = useGetRating({ providerEmail: user?.email ?? "" })
  // console.log('rating', rating);

  const reviews = reviewsData?.data || [];
  const averageRating = rating?.data ?? 0; // API now returns the average rating directly
  const reviewCount = reviews.length; // Number of reviews

  // Calculate actual distribution from individual review data
  const actualDistribution = calculateActualDistribution(reviews);

  // Create rating stats with actual distribution
  const ratingStats = {
    averageRating: averageRating.toFixed(1),
    ratingCounts: actualDistribution.counts,
    percentages: actualDistribution.percentages,
    totalReviews: reviewCount
  };

  // console.log('Average Rating:', averageRating);
  // console.log('Review Count:', reviewCount);
  // console.log('Actual Distribution:', actualDistribution);
  // console.log('reviews', reviews);

  if (isPending || ratingPending) {
    return <LoadingState />;
  }

  if (isError || ratingError) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <ProfileHeader title='Reviews' showNotification={false} showCurrency={true} showBackArrow={true} />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <RatingSummary ratingStats={ratingStats} ratingCount={averageRating} />
        <CommentsHeader ratingStats={ratingStats} />
        <ReviewsList reviews={reviews} />
      </ScrollView>
    </SafeAreaView>
  );
}