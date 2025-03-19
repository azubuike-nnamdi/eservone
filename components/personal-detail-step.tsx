import { Text, TextInput, View } from "react-native";
import Button from "./common/button";
import { useState } from "react";
import { FormData } from "@/constants/types";

export const PersonalDetailsStep = ({
  data,
  onNext
}: {
  data: FormData['personalDetails'],
  onNext: (details: FormData['personalDetails']) => void
}) => {
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);

  return (
    <View>
      <View className="mb-4">
        <Text className="text-base mb-2 text-black">First name</Text>
        <TextInput
          className="w-full h-14 border border-gray-200 rounded-md px-4"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter your first name"
        />
      </View>

      <View className="mb-6">
        <Text className="text-base mb-2 text-black">Last name</Text>
        <TextInput
          className="w-full h-14 border border-gray-200 rounded-md px-4"
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter your last name"
        />
      </View>

      <Button
        onPress={() => onNext({ firstName, lastName })}
        disabled={!firstName || !lastName}
      >
        Next
      </Button>
    </View>
  );
};