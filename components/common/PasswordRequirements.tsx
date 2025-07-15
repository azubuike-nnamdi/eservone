import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface PasswordRequirementsProps {
  password: string;
}

const requirements = [
  {
    label: '8 characters',
    test: (pw: string) => pw.length >= 8,
  },
  {
    label: 'An uppercase letter',
    test: (pw: string) => /[A-Z]/.test(pw),
  },
  {
    label: 'A lowercase letter',
    test: (pw: string) => /[a-z]/.test(pw),
  },
  {
    label: 'A number',
    test: (pw: string) => /\d/.test(pw),
  },
  {
    label: 'A special character',
    test: (pw: string) => /[^A-Za-z0-9]/.test(pw),
  },
];

export default function PasswordRequirements({ password }: PasswordRequirementsProps) {
  return (
    <View className="flex-row flex-wrap gap-2 mt-2 mb-4">
      {requirements.map((req) => {
        const met = req.test(password);
        return (
          <View
            key={req.label}
            className={`flex-row items-center px-3 py-1 rounded-full border ${met ? 'bg-green-50 border-green-400' : 'bg-gray-50 border-gray-200'}`}
            style={{ marginRight: 8, marginBottom: 8 }}
          >
            {met ? (
              <Ionicons name="checkmark" size={16} color="#22C55E" style={{ marginRight: 4 }} />
            ) : null}
            <Text className={met ? 'text-green-700 font-medium' : 'text-gray-400'} style={{ fontSize: 14 }}>
              {req.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
} 