import React from 'react';
import { VStack } from '../../../components/ui/vstack';
import { HStack } from '../../../components/ui/hstack';
import { Input, InputField } from '../../../components/ui/input';
import { Text } from '../../../components/ui/text';
import { Pressable } from 'react-native';

type FoodSearchProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
};

export const FoodSearch: React.FC<FoodSearchProps> = ({
  value,
  onChangeText,
  onSearch,
}) => {
  return (
    <VStack className="py-3 px-4 bg-white border-b border-gray-200">
      <HStack className="items-center space-x-2">
        <Input variant="outline" size="md" className="flex-1 bg-gray-50 rounded-lg">
          <InputField
            placeholder="Search food"
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSearch}
            returnKeyType="search"
            className="pl-3"
          />
        </Input>
        <Pressable onPress={onSearch}>
          <Text className="text-blue-500 font-medium">Search</Text>
        </Pressable>
      </HStack>
    </VStack>
  );
};
