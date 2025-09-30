import icons from "@/constants/icons";
import { Image, TextInput, TouchableOpacity } from "react-native";

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, value, onChangeText, onPress }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className="flex-row items-center bg-primary-100 rounded-full px-5 py-4"
    >
      <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode="contain"
        tintColor="#000"
      />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2  placeholder:text-black"
        placeholderTextColor="#0F0F0"
        editable={!!onChangeText}
        pointerEvents={onPress ? "none" : "auto"}
      />
    </TouchableOpacity>
  );
};

export default SearchBar;