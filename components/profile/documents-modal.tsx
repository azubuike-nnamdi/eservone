import { IndustrialCertificate, IndustrialCertificateDocument } from "@/constants/types";
import React from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import DocumentItem from "./document-item";

interface DocumentsModalProps {
  visible: boolean;
  selectedService: IndustrialCertificate | null;
  onClose: () => void;
  onDocumentPress: (document: IndustrialCertificateDocument) => void;
}

export default function DocumentsModal({
  visible,
  selectedService,
  onClose,
  onDocumentPress
}: DocumentsModalProps) {
  const renderDocumentItem = ({ item, index }: { item: IndustrialCertificateDocument; index: number }) => (
    <DocumentItem
      item={item}
      index={index}
      onPress={onDocumentPress}
    />
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
          <Text className="text-lg font-bold text-black">
            {selectedService?.serviceName} Certificates
          </Text>
          <TouchableOpacity onPress={onClose} className="p-2">
            <Text className="text-blue-500 font-medium">Close</Text>
          </TouchableOpacity>
        </View>

        {/* Documents List */}
        <View className="flex-1 p-4">
          <Text className="text-sm text-gray-600 mb-4">
            {selectedService?.documentUploadCount} certificates available
          </Text>

          <FlatList
            data={selectedService?.documents || []}
            renderItem={renderDocumentItem}
            keyExtractor={(item, index) => `${item.serviceId}-${index}`}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );
}
