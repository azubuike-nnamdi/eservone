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
import { estimateRatingDistribution } from "@/lib/rating-distribution-utils";
import { calculateAverageRating } from "@/lib/rating-utils";
import { useAuthStore } from "@/store/auth-store";
import { SafeAreaView, ScrollView } from "react-native";

export default function ViewReviews() {
  const { user } = useAuthStore();
  const { data: reviewsData, isPending, error, isError, refetch } = useGetAllReviews({
    providerEmail: user?.email ?? ""
  });
  const { data: rating, isPending: ratingPending, isError: ratingError } = useGetRating({ providerEmail: user?.email ?? "" })

  const reviews = reviewsData?.data || [];
  const totalRatingCount = rating?.data ?? 0; // This is the sum of all ratings (e.g., 3)
  const reviewCount = reviews.length; // Number of reviews

  // Calculate the average rating from total rating count and review count
  const averageRating = calculateAverageRating(totalRatingCount, reviewCount);

  // Since individual ratings aren't available, estimate the distribution
  const estimatedDistribution = estimateRatingDistribution(totalRatingCount, reviewCount);

  // Create rating stats with estimated distribution
  const ratingStats = {
    averageRating: averageRating.toFixed(1),
    ratingCounts: {
      5: Math.round((estimatedDistribution[5] / 100) * reviewCount),
      4: Math.round((estimatedDistribution[4] / 100) * reviewCount),
      3: Math.round((estimatedDistribution[3] / 100) * reviewCount),
      2: Math.round((estimatedDistribution[2] / 100) * reviewCount),
      1: Math.round((estimatedDistribution[1] / 100) * reviewCount),
    },
    percentages: estimatedDistribution,
    totalReviews: reviewCount
  };

  console.log('Total Rating Count:', totalRatingCount);
  console.log('Review Count:', reviewCount);
  console.log('Average Rating:', averageRating);
  console.log('Estimated Distribution:', estimatedDistribution);

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