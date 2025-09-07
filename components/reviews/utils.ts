import { RatingStats, Review } from './types';

export const calculateRatingStats = (reviews: Review[]): RatingStats => {
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

export const getInitials = (name: string): string => {
  if (!name || name.trim() === '') return 'U';

  const words = name.trim().split(' ');
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  // Get first letter of first word and first letter of last word
  return `${words[0].charAt(0)}${words[words.length - 1].charAt(0)}`.toUpperCase();
};

export const getRandomColor = (userId: number): string => {
  const colors = [
    "#3E3F93", "#FF6B6B", "#4ECDC4", "#45B7D1", "#F9A826",
    "#7C5DC1", "#5A87FF", "#FF8A00", "#2CD9C5", "#FF5E7D"
  ];
  return colors[userId % 10];
};

export const formatDate = (dateString?: string): string => {
  if (!dateString) return "Recent";

  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
