import { useState } from "react";
import { View } from "react-native";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icon";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

const SearchBar = ({
  value,
  onChangeText,
  placeholder = "Search name...",
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="px-4 py-2">
      <Input>
        <InputSlot className="pl-3">
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          autoCapitalize="none"
          autoCorrect={false}
          className="text-black"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(!isFocused)}
        />
      </Input>
    </View>
  );
};

export default SearchBar;
