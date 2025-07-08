import { useGetAllCountries } from '@/hooks/query/useGetAllCountries';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Country {
  id: number;
  country: string;
  currency: string;
}

interface CountryDropdownProps {
  value: string;
  onSelect: (country: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
}

export default function CountryDropdown({
  value,
  onSelect,
  placeholder = "Select your country",
  label,
  error
}: CountryDropdownProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: countriesResponse, isPending } = useGetAllCountries();

  const countries = countriesResponse?.data || [];

  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) {
      return countries;
    }
    return countries.filter((country: Country) =>
      country.country.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, countries]);

  const selectedCountry = countries.find((country: Country) => country.country === value);

  const handleSelect = (country: Country) => {
    onSelect(country.country);
    setIsVisible(false);
    setSearchQuery('');
  };

  const renderCountryItem = ({ item }: { item: Country }) => (
    <TouchableOpacity
      className="py-3 px-4 border-b border-gray-100"
      onPress={() => handleSelect(item)}
    >
      <Text className="text-base text-gray-800">{item.country}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="mb-4">
      {label && (
        <Text className="text-base mb-2 text-black">{label}</Text>
      )}

      <TouchableOpacity
        className={`w-full h-14 border ${error ? 'border-danger' : 'border-gray-200'} rounded-md px-4 flex-row items-center justify-between`}
        onPress={() => setIsVisible(true)}
        disabled={isPending}
      >
        <Text className={`text-base ${selectedCountry ? 'text-black' : 'text-gray-400'}`}>
          {selectedCountry ? selectedCountry.country : isPending ? 'Loading countries...' : placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>

      {error && (
        <Text className="text-danger text-sm mt-1">{error}</Text>
      )}

      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsVisible(false)}
      >
        <View className="flex-1 bg-black/70 bg-opacity-50 justify-end">
          <View className="bg-white rounded-t-3xl max-h-[80%]">
            {/* Header */}
            <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
              <Text className="text-lg font-semibold text-black">Select Country</Text>
              <TouchableOpacity onPress={() => setIsVisible(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Search Input */}
            <View className="p-4 border-b border-gray-200">
              <View className="flex-row items-center border border-gray-200 rounded-md px-3">
                <Ionicons name="search" size={20} color="#666" />
                <TextInput
                  className="flex-1 py-3 px-2 text-base text-black"
                  placeholder="Search countries..."
                  placeholderTextColor="#999"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoFocus
                />
              </View>
            </View>

            {/* Countries List */}
            <FlatList
              data={filteredCountries}
              renderItem={renderCountryItem}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              className="max-h-96"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
} 