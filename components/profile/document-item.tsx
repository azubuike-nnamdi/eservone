import { IndustrialCertificateDocument } from "@/constants/types";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface DocumentItemProps {
  item: IndustrialCertificateDocument;
  index: number;
  onPress: (document: IndustrialCertificateDocument) => void;
}

export default function DocumentItem({ item, index, onPress }: DocumentItemProps) {
  return (
    <TouchableOpacity
      key={index}
      onPress={() => onPress(item)}
      className="p-3 border border-gray-200 rounded-lg mb-2"
    >
      <Text className="text-sm font-medium text-gray-800">
        Certificate {index + 1}
      </Text>
      <Text className="text-xs text-gray-500 mt-1">
        Status: {item.certificateValid ? 'Verified' : 'Not Verified'}
      </Text>
    </TouchableOpacity>
  );
}
