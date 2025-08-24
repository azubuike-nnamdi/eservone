import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ServiceDetailsProps {
  serviceName: string;
  serviceDescription: string;
  minPrice: string;
  maxPrice: string;
  selectedServiceType: 'HOME_SERVICE' | 'WALK_IN_SERVICE';
  onServiceTypeChange: (type: 'HOME_SERVICE' | 'WALK_IN_SERVICE') => void;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({
  serviceName,
  serviceDescription,
  minPrice,
  maxPrice,
  selectedServiceType,
  onServiceTypeChange,
}) => {
  return (
    <View>
      <Text className="text-lg font-bold mb-1">{serviceName}</Text>
      <Text className="text-gray-700 mb-1">{minPrice} - {maxPrice}</Text>
      <Text className="text-gray-600 mb-2">{serviceDescription || 'No description provided.'}</Text>

      {/* Service type tabs */}
      <View className="mb-3">
        <View className="flex-row bg-gray-100 rounded-md p-1">
          <TouchableOpacity
            className={`flex-1 py-3 rounded-md ${selectedServiceType === 'HOME_SERVICE' ? 'bg-primary-300' : 'bg-transparent'}`}
            onPress={() => onServiceTypeChange('HOME_SERVICE')}
          >
            <Text className={`text-center font-semibold text-base ${selectedServiceType === 'HOME_SERVICE' ? 'text-white' : 'text-gray-600'}`}>
              Home service
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 rounded-md ${selectedServiceType === 'WALK_IN_SERVICE' ? 'bg-primary-300' : 'bg-transparent'}`}
            onPress={() => onServiceTypeChange('WALK_IN_SERVICE')}
          >
            <Text className={`text-center font-semibold text-base ${selectedServiceType === 'WALK_IN_SERVICE' ? 'text-white' : 'text-gray-600'}`}>
              Visit service provider
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ServiceDetails;
