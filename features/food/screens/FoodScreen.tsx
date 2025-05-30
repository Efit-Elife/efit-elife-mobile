import React from 'react';
import { SafeAreaView } from '../../../components/ui/safe-area-view';
import { VStack } from '../../../components/ui/vstack';
import { HStack } from '../../../components/ui/hstack';
import { Text } from '../../../components/ui/text';
import { FoodList } from '../components/FoodList';
import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function FoodScreen() {
  const router = useRouter();
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <VStack className="flex-1">
        <HStack className="p-4 bg-white border-b border-gray-200 items-center">
          <Pressable>
            <Text className="text-blue-500 mr-2">&lt; Index</Text>
          </Pressable>
          <Text className="flex-1 text-center font-medium">Search</Text>
          <Pressable onPress={() => router.push('/firebase-test')}>
            <Text className="text-blue-500">Test Mode</Text>
          </Pressable>
        </HStack>
        <FoodList />
      </VStack>
    </SafeAreaView>
  );
}
