import React from "react";
import { View } from "react-native";
import { Exercise } from "@/types/common";
import ExerciseItem from "./ExerciseItem";
import SearchBar from "../../../components/SearchBar/SearchBar";
import List from "@/components/List/List";
import useExerciseStore from "../store/useExerciseStore";
import { SafeAreaView } from "react-native-safe-area-context";
type ExerciseListProps = {
  onPress: (id: string) => void;
};

const ExerciseList = ({ onPress }: ExerciseListProps) => {
  const { searchQuery, setSearchQuery, getFilteredExercises } =
    useExerciseStore();

  const filteredExercises = getFilteredExercises();

  const renderItem = ({ item }: { item: Exercise }) => (
    <ExerciseItem item={item} onPress={onPress} />
  );

  return (
    <SafeAreaView>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <List
        data={filteredExercises}
        renderItem={renderItem}
        emptyText="No Execerise Recorded"
        title="Exercises"
      />
    </SafeAreaView>
  );
};

export default ExerciseList;
