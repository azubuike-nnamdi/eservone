import { IndustrialCertificate } from "@/constants/types";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CertificateItemProps {
  item: IndustrialCertificate;
  index: number;
  totalItems: number;
  onPress: (certificate: IndustrialCertificate) => void;
}

export default function CertificateItem({ item, index, totalItems, onPress }: CertificateItemProps) {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View>
        <View className="flex-row items-center justify-between p-4">
          {/* Left side - Service name and verification */}
          <View className="flex-1">
            <Text className="text-base font-bold text-black mb-1">
              {item.serviceName}
            </Text>

            <Text className="text-sm text-gray-500">
              {item.documentUploadCount} certificates added
            </Text>
          </View>
        </View>

        {/* Divider line - except for last item */}
        {index < totalItems - 1 && (
          <View className="h-px bg-gray-200 mx-4" />
        )}
      </View>
    </TouchableOpacity>
  );
}
