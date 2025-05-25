import React from "react";
import List from "@/components/List/List";
import { Exercise } from "@/types/common";
import ExerciseItem from "./ExerciseItem";

type ExerciseListProps = {
  exercises: Exercise[];
  onPress: (id: string) => void;
};

const ExerciseList = ({ exercises, onPress }: ExerciseListProps) => {
  const renderItem = ({ item }: { item: Exercise }) => (
    <ExerciseItem item={item} onPress={onPress} />
  );

  return (
    <List
      data={exercises}
      renderItem={renderItem}
      title="Exercise Library"
      emptyText="No exercises found"
    />
  );
};

export default ExerciseList;
