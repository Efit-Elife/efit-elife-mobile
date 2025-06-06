import React from 'react';
import { HStack } from '../../../components/ui/hstack';
import { Text } from '../../../components/ui/text';
import { Button, ButtonIcon, ButtonText } from '../../../components/ui/button';
import { Plus as PlusIcon } from 'lucide-react-native';

type FoodItemProps = {
  name: string;
  calories: number;
  onAdd: () => void;
};

export const FoodItem: React.FC<FoodItemProps> = ({ name, calories, onAdd }) => {
  return (
    <HStack className="py-3.5 px-4 justify-between items-center border-b border-gray-100">
      <HStack className="flex-1">
        <Text className="text-base font-medium text-gray-800">{name}</Text>
      </HStack>
      <HStack className="items-center space-x-4">
        <Text className="text-sm text-gray-500">{calories} cal</Text>
        <Button 
          action="primary" 
          variant="outline" 
          size="sm"
          onPress={onAdd}
          className="h-7 w-7 rounded-full p-0"
        >
          <ButtonIcon as={PlusIcon} className="h-4 w-4" />
        </Button>
      </HStack>
    </HStack>
  );
};
