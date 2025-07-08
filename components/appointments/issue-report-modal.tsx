import { Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import { Modal, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface IssueReportModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (issueType: string, description: string) => void;
  isLoading?: boolean;
}

const ISSUE_TYPES = [
  "Harassment",
  "Fraud",
  "Inappropriate behavior",
  "Other"
];

const IssueReportModal: React.FC<IssueReportModalProps> = ({
  visible,
  onClose,
  onSubmit,
  isLoading
}) => {
  const [issueType, setIssueType] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (issueType && description.trim()) {
      onSubmit(issueType, description);
      setIssueType("");
      setDescription("");
      setShowDropdown(false);
    }
  };

  const handleClose = () => {
    setIssueType("");
    setDescription("");
    setShowDropdown(false);
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
          {/* Drag indicator and close button */}
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-1 items-center">
              <View className="w-16 h-1.5 bg-gray-200 rounded-full" />
            </View>
            <TouchableOpacity onPress={handleClose} className="absolute right-0">
              <Ionicons name="close" size={24} color="#222" />
            </TouchableOpacity>
          </View>

          <Text className="text-lg font-bold mb-6">Report service provider</Text>

          {/* Issue type dropdown */}
          <Text className="text-base mb-2">Issue type</Text>
          <Pressable
            className="border border-gray-300 rounded-lg p-3 mb-6 flex-row justify-between items-center"
            onPress={() => setShowDropdown((v) => !v)}
            disabled={isLoading}
          >
            <Text className={issueType ? "text-black" : "text-gray-400"}>
              {issueType || "Select issue type"}
            </Text>
            <Ionicons name={showDropdown ? "chevron-up" : "chevron-down"} size={20} color="#888" />
          </Pressable>
          {showDropdown && (
            <View className="border border-gray-300 rounded-lg mb-6 bg-white absolute left-6 right-6 z-10 top-[160px]">
              {ISSUE_TYPES.map((type) => (
                <TouchableOpacity
                  key={type}
                  className="p-3 border-b border-gray-100"
                  onPress={() => {
                    setIssueType(type);
                    setShowDropdown(false);
                  }}
                  disabled={isLoading}
                >
                  <Text className="text-black">{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Description input */}
          <Text className="text-base mb-2">Describe your issue</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-base mb-8 min-h-[80px]"
            placeholder="Start typing ..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            editable={!isLoading}
          />

          {/* Report button */}
          <TouchableOpacity
            className="py-4 rounded-lg bg-[#3F378C]"
            onPress={handleSubmit}
            disabled={isLoading || !issueType || !description.trim()}
          >
            <Text className="text-center text-base text-white font-semibold">
              {isLoading ? "Reporting..." : "Report"}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default IssueReportModal; 