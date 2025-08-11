import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Button from '../common/button';

interface EditServiceModalProps {
  visible: boolean;
  onClose: () => void;
  service: any;
  onSave: (updated: { serviceName: string; serviceDescription: string; minimumPrice: string; maximumPrice: string }) => void;
}

export default function EditServiceModal({ visible, onClose, service, onSave }: EditServiceModalProps) {
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editMinFee, setEditMinFee] = useState('');
  const [editMaxFee, setEditMaxFee] = useState('');

  useEffect(() => {
    if (service) {
      setEditName(service.serviceName || '');
      setEditDescription(service.serviceDescription || '');
      setEditMinFee(service.minimumPrice?.toString() || '');
      setEditMaxFee(service.maximumPrice?.toString() || '');
    }
  }, [service, visible]);

  const handleSave = () => {
    onSave({
      serviceName: service.serviceName, // Keep original service name
      serviceDescription: editDescription,
      minimumPrice: editMinFee,
      maximumPrice: editMaxFee,
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/30">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="w-full"
          keyboardVerticalOffset={32}
        >
          <View className="bg-white rounded-t-2xl p-6 pb-10" style={{ minHeight: 400, maxHeight: '90%' }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 32 }}
              keyboardShouldPersistTaps="handled"
            >
              {/* Close Icon */}
              <TouchableOpacity onPress={onClose} className="absolute right-4 top-4 z-10">
                <Ionicons name="close" size={28} color="#222" />
              </TouchableOpacity>
              <Text className="text-lg font-bold mb-4 text-center">Edit Service </Text>
              {/* Editable Fields */}
              <Text className="text-gray-700 mb-1">Service name</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 text-base text-gray-500 bg-gray-100 mb-3"
                value={editName}
                editable={false}
                placeholder="Service name"
              />
              <Text className="text-gray-700 mb-1">Service description</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 text-base text-black bg-gray-50 mb-3"
                value={editDescription}
                onChangeText={setEditDescription}
                placeholder="Service description"
                multiline
              />
              <View className="flex-row gap-4 mb-3">
                <View className="flex-1">
                  <Text className="text-gray-700 mb-1">Min fee</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg p-3 text-base text-black bg-gray-50"
                    value={editMinFee}
                    onChangeText={setEditMinFee}
                    placeholder="0.00"
                    keyboardType="numeric"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-700 mb-1">Max fee</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg p-3 text-base text-black bg-gray-50"
                    value={editMaxFee}
                    onChangeText={setEditMaxFee}
                    placeholder="0.00"
                    keyboardType="numeric"
                  />
                </View>
              </View>
              {/* Save Button */}
              <Button
                onPress={handleSave}
                className="mt-4"
              >
                Save changes
              </Button>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
} 