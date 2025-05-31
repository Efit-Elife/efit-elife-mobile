import React from "react";
import { Exercise } from "@/types/common";
import ExerciseItem from "./ExerciseItem";
import SearchBar from "@/components/SearchBar/SearchBar";
import List from "@/components/List/List";
import useExerciseStore from "../store/useExerciseStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDebounceValue } from "usehooks-ts";
import { getExercisesByNameQuery } from "../queries";
import { useQuery } from "@tanstack/react-query";

type ExerciseListProps = {
  onPress: (id: string) => void;
  exercises: Exercise[];
  isLoading?: boolean;
};

const ExerciseList = ({ onPress, exercises, isLoading }: ExerciseListProps) => {
  const { searchQuery, setSearchQuery } = useExerciseStore();
  const [debouncedSearchValue] = useDebounceValue(searchQuery, 300);

  const { data, isLoading: searchLoading } = useQuery(
    getExercisesByNameQuery(debouncedSearchValue)
  );

  const displayedExercises =
    searchQuery.trim().length > 0 ? data ?? [] : exercises;

  const renderItem = ({ item }: { item: Exercise }) => (
    <ExerciseItem
      item={item}
      onPress={item.isPremium ? () => {} : () => onPress(item.id)}
    />
  );

  return (
    <SafeAreaView>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <List
        data={displayedExercises}
        renderItem={renderItem}
        emptyText="No Exercise Recorded"
        title="Exercises"
        isLoading={isLoading || searchLoading}
      />
    </SafeAreaView>
  );
};

export default ExerciseList;
