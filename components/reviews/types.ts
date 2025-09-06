export interface Review {
  content: string;
  commentCreatedBy: number;
  serviceAppointmentId: string | null;
  serviceId: string;
  rating: number | null;
  serviceProviderEmail: string;
  createdAt?: string;
}

export interface RatingStats {
  averageRating: string;
  ratingCounts: Record<number, number>;
  percentages: Record<number, number>;
  totalReviews: number;
}
