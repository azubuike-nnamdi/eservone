import { Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ReviewSubmissionModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  isLoading?: boolean;
}

const ReviewSubmissionModal: React.FC<ReviewSubmissionModalProps> = ({
  visible,
  onClose,
  onSubmit,
  isLoading
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, comment);
      setRating(0);
      setComment('');
    }
  };

  const handleClose = () => {
    setRating(0);
    setComment('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <SafeAreaView className="bg-white rounded-t-2xl p-6 max-h-[80%] mb-4">
          <Text className="text-lg font-bold mb-4 text-center">Rate Your Experience</Text>

          {/* Rating Stars */}
          <View className="flex-row justify-center mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                disabled={isLoading}
                className="mx-1"
              >
                <Ionicons
                  name={star <= rating ? "star" : "star-outline"}
                  size={32}
                  color={star <= rating ? "#FFD700" : "#D1D5DB"}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Comment Input */}
          <View className="mb-6">
            <Text className="text-sm text-gray-600 mb-2">Share your experience (optional)</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 text-base"
              placeholder="Tell us about your experience..."
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={4}
              editable={!isLoading}
            />
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-4">
            <TouchableOpacity
              className="flex-1 py-3 rounded-lg border border-gray-200 bg-gray-100"
              onPress={handleClose}
              disabled={isLoading}
            >
              <Text className="text-center text-base text-gray-700 font-semibold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 py-3 rounded-lg bg-primary-300"
              onPress={handleSubmit}
              disabled={isLoading || rating === 0}
            >
              <Text className="text-center text-base text-white font-semibold">
                {isLoading ? "Submitting..." : "Submit Review"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default ReviewSubmissionModal; 