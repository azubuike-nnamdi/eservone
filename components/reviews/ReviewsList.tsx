import React from 'react';
import { View } from 'react-native';
import EmptyState from './EmptyState';
import ReviewItem from './ReviewItem';
import { Review } from './types';

interface ReviewsListProps {
  reviews: Review[];
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return <EmptyState />;
  }

  return (
    <View className="pb-8">
      {reviews.map((review: Review, index: number) => (
        <View key={`${review.commentCreatedBy}-${index}`}>
          <ReviewItem review={review} />
        </View>
      ))}
    </View>
  );
};

export default ReviewsList;
