import Button from '@/components/common/button';
import StarRating from '@/components/common/StarRating';
import React from 'react';
import { Text, View } from 'react-native';

interface RatingSectionProps {
  averageRating: number; // This is the average rating from the API
  reviewCount: number;
  onViewReviews: () => void;
}

/**
 * Component for displaying the rating section with stars and review count
 */
const RatingSection: React.FC<RatingSectionProps> = ({
  averageRating,
  reviewCount,
  onViewReviews
}) => {

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
