import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ProviderProfileBioProps {
  bio: string;
}

export default function ProviderProfileBio({ bio }: ProviderProfileBioProps) {
  const [showFullBio, setShowFullBio] = useState(false);
  const bioText = bio || "No bio available for this provider.";
  const displayBio = showFullBio ? bioText : bioText.slice(0, 150) + (bioText.length > 150 ? '...' : '');

  return (
    <View className="mt-6">
      <Text className="text-lg font-bold text-black mb-3">Bio:</Text>
      <Text className="text-gray-700 leading-6 mb-2">{displayBio}</Text>
      {bioText.length > 150 && (
        <TouchableOpacity onPress={() => setShowFullBio(!showFullBio)}>
          <Text className="text-blue-600 underline">
            {showFullBio ? 'Read less' : 'Read more...'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
