import { Ionicons } from '@expo/vector-icons';
import React from 'react';

interface StarRatingProps {
  rating: number;
  size?: number;
  showHalfStars?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 16,
  showHalfStars = true
}) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = showHalfStars && rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Ionicons key={i} name="star" size={size} color="#FFD700" />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <Ionicons key={i} name="star-half" size={size} color="#FFD700" />
      );
    } else {
      stars.push(
        <Ionicons key={i} name="star-outline" size={size} color="#D1D5DB" />
      );
    }
  }

  return <>{stars}</>;
};

export default StarRating;
