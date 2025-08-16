import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

interface MessageInputProps {
  input: string;
  setInput: (text: string) => void;
  onSend: () => void;
  isSending: boolean;
}

export default function MessageInput({ input, setInput, onSend, isSending }: MessageInputProps) {
  return (
    <View className="flex-row items-center px-3 py-2 border-gray-200 border bg-white mx-4 rounded-full">
      <TextInput
        className="flex-1 text-base text-zinc-800 px-2 py-2 bg-transparent z-50"
        placeholder="Type a message..."
        placeholderTextColor="#A1A1AA"
        value={input}
        onChangeText={setInput}
        multiline
        editable={!isSending}
      />
      <TouchableOpacity onPress={onSend} disabled={isSending}>
        <Ionicons name="send" size={24} color={isSending ? "#ccc" : "black"} />
      </TouchableOpacity>
    </View>
  );
}
