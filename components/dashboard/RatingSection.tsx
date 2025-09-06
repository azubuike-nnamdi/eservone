import Button from '@/components/common/button';
import StarRating from '@/components/common/StarRating';
import { calculateAverageRating } from '@/lib/rating-utils';
import React from 'react';
import { Text, View } from 'react-native';

interface RatingSectionProps {
  ratingCount: number; // This is the total sum of all ratings
  reviewCount: number;
  onViewReviews: () => void;
}

/**
 * Component for displaying the rating section with stars and review count
 */
const RatingSection: React.FC<RatingSectionProps> = ({
  ratingCount,
  reviewCount,
  onViewReviews
}) => {
  // Calculate the actual average rating from total rating count and review count
  const averageRating = calculateAverageRating(ratingCount, reviewCount);

  return (
    <View className='my-12 flex-col items-center justify-between'>
      <Text className='text-xl text-black-300 font-bold'>Average customer rating:</Text>
      <Text className='text-5xl font-bold my-4 text-primary-300'>
        {averageRating.toFixed(1)}
      </Text>

      <StarRating
        rating={averageRating}
        size={20}
        activeColor="#3E3F93"
        inactiveColor="#D1D5DB"
        showHalfStars={true}
      />

      <Text className='text-lg text-black-300 font-medium mt-4'>
        {reviewCount ?? 0} reviews
      </Text>

      <Button
        type='button'
        variant='outline'
        className='mt-4 w-6/12'
        onPress={onViewReviews}
      >
        <Text className='font-bold text-primary-300 text-lg'>Read all reviews</Text>
      </Button>
    </View>
  );
};

export default RatingSection;
