import { Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ReviewSubmissionModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  isLoading?: boolean;
}

const MAX_COMMENT_CHARACTERS = 300;

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

  const handleCommentChange = (text: string) => {
    if (text.length <= MAX_COMMENT_CHARACTERS) {
      setComment(text);
    }
  };

  const handleClose = () => {
    setRating(0);
    setComment('');
    onClose();
  };

  const isCommentOverLimit = comment.length > MAX_COMMENT_CHARACTERS;
  const commentCharacterCount = comment.length;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <SafeAreaView className="bg-white rounded-t-2xl p-6 max-h-[80%] mb-4">
            <Text className="text-lg font-bold mb-4 text-center">Rate Your Experience</Text>

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
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
                  className={`border rounded-lg p-3 text-base ${isCommentOverLimit ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="Tell us about your experience..."
                  value={comment}
                  onChangeText={handleCommentChange}
                  multiline
                  numberOfLines={4}
                  editable={!isLoading}
                />
                <View className="flex-row justify-between items-center mt-1">
                  <Text className="text-xs text-gray-500">
                    {commentCharacterCount}/{MAX_COMMENT_CHARACTERS} characters
                  </Text>
                  {isCommentOverLimit && (
                    <Text className="text-xs text-red-500">
                      Over limit
                    </Text>
                  )}
                </View>
              </View>
            </ScrollView>

            {/* Action Buttons */}
            <View className="flex-row gap-4 mt-4">
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
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default ReviewSubmissionModal; 