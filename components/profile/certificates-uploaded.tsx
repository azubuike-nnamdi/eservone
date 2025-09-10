import { UPLOAD_CERTIFICATE } from "@/constants/routes";
import { IndustrialCertificate, IndustrialCertificateDocument } from "@/constants/types";
import { useRouter } from "expo-router";
import * as WebBrowser from 'expo-web-browser';
import React, { useState } from "react";
import { Alert, FlatList, View } from "react-native";
import FloatingActionButton from "../common/floating-action-button";
import CertificateItem from "./certificate-item";
import DocumentsModal from "./documents-modal";

export default function CertificatesUploaded({ certificates }: { certificates: IndustrialCertificate[] }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<IndustrialCertificate | null>(null);

  const router = useRouter();


  const handleCertificatePress = (certificate: IndustrialCertificate) => {
    setSelectedService(certificate);
    setModalVisible(true);
  };

  const handleDocumentPress = async (document: IndustrialCertificateDocument) => {
    try {
      // Open PDF in device's default browser
      await WebBrowser.openBrowserAsync(document.industrialCertificate, {
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
        controlsColor: '#3B82F6',
        showTitle: true,
        enableBarCollapsing: false,
        showInRecents: true,
      });
    } catch (error) {
      console.log('WebBrowser error:', error);
      Alert.alert('Error', 'Failed to open PDF document');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedService(null);
  };

  const renderCertificateItem = ({ item, index }: { item: IndustrialCertificate; index: number }) => (
    <CertificateItem
      item={item}
      index={index}
      totalItems={certificates.length}
      onPress={handleCertificatePress}
    />
  );

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={certificates}
        renderItem={renderCertificateItem}
        keyExtractor={(item) => item.serviceId.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }} // Add padding for FAB
      />

      {/* Floating Action Button */}
      <FloatingActionButton
        onPress={() => router.push(UPLOAD_CERTIFICATE)}
        icon="+"
      />

      {/* Documents Modal */}
      <DocumentsModal
        visible={modalVisible}
        selectedService={selectedService}
        onClose={closeModal}
        onDocumentPress={handleDocumentPress}
      />
    </View>
  );
}