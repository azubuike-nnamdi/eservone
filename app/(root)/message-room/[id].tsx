import ProfileHeader from "@/components/common/profile-header";
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


// Add a type for the message prop
interface Message {
  id: string;
  sender: string;
  name: string;
  time: string;
  text: string;
  isOrder?: boolean;
}

// Mock message data
const messages: Message[] = [
  {
    id: '1',
    sender: 'provider',
    name: 'XYZ Studios',
    time: '17:52',
    text: 'Good afternoon Tobi, I received your request and unfortunately i do not receive house calls that have pets. I am allergic to cats.',
  },
  {
    id: '2',
    sender: 'user',
    name: 'ME',
    time: '17:55',
    text: 'Hi, would you be okay if i sent the cats away for a few hours.',
  },
  {
    id: '3',
    sender: 'provider',
    name: 'XYZ Studios',
    time: '17:52',
    text: 'Yes! that would be great. I would normally charge $19 but I\'ll take $15 for the trouble 😊',
  },
  {
    id: '4',
    sender: 'user',
    name: 'ME',
    time: '17:55',
    text: 'Thanks. Please confirm booking with price.',
  },
  {
    id: '5',
    sender: 'provider',
    name: 'XYZ Studios',
    time: '17:52',
    text: 'Order accepted:\nYour request for Wig Installation on 23/11/2023 has been accepted. You\'ll be charged $15',
    isOrder: true,
  },
  {
    id: '6',
    sender: 'provider',
    name: 'XYZ Studios',
    time: '17:55',
    text: 'XYZ Studios has enabled location sharing for security purposes. To share your location, click on the menu in the top right corner of your screen.',
  },
];

const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.sender === 'user';
  return (
    <View
      className={`my-1 px-3 py-2 rounded-2xl max-w-[80%] shadow-sm ${isUser ? 'bg-red-100 self-end mr-2 ml-10' : 'bg-indigo-100 self-start ml-2 mr-10'}`}
    >
      <Text className="text-zinc-800 font-medium mb-0.5">
        {isUser ? 'ME' : 'XYZ Studios'}
        <Text className="text-xs font-normal text-zinc-400"> • {message.time}</Text>
      </Text>
      <Text className="text-zinc-800 text-sm">{message.text}</Text>
      {message.isOrder && (
        <View className="flex-row mt-2 space-x-2">
          <TouchableOpacity className="flex-1 border border-blue-600 rounded-md">
            <Text className="text-blue-600 text-center py-1">Make payment</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 border border-red-600 rounded-md">
            <Text className="text-red-600 text-center py-1">Decline offer</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default function MessageRoom() {
  const [input, setInput] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ProfileHeader title="Messages" showNotification={false} />
        <View className="flex-1">
          <FlatList
            data={messages}
            keyExtractor={item => item.id}
            contentContainerStyle={{ padding: 16, paddingBottom: 16, flexGrow: 1 }}
            renderItem={({ item }) => <MessageBubble message={item} />}
            ListEmptyComponent={
              <View className="flex-1 justify-center items-center">
                <Text>No messages yet</Text>
              </View>
            }
            inverted // Show latest messages at the bottom
          />
        </View>
        {/* Input field fixed at the bottom */}
        <View className="flex-row items-center px-3 py-2 border-gray-200 border bg-white mx-4 rounded-full">
          <TextInput
            className="flex-1 text-base text-zinc-800 px-2 py-2 bg-transparent z-50"
            placeholder="Type a message..."
            placeholderTextColor="#A1A1AA"
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity onPress={() => setInput("")}>
            <Ionicons name="send" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 