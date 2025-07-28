import { create } from "zustand";

export interface BasicInfoData {
  firstName: string;
  lastName: string;
  weight: number;
  height: number;
  age: number;
  gender: "Male" | "Female" | "Other";
}

export interface TrainingInfoData {
  trainingGoal: string;
  exerciseIntensity: "Low" | "Moderate" | "High";
  tdee: number;
  favoriteSport: string;
  weeklyTrainingFrequency: number;
  currentDiet: string;
}

export interface NutritionInfoData {
  dailyFoodPortion: string;
  favoriteTypeOfFood: string;
  favoriteDrink: string;
  dailyWaterIntake: number;
}

export interface MedicalInfoData {
  medicalConditions: string[];
  usesSmartWatch: boolean;
  smartWatchType?: string;
}

interface SetupProfileState {
  // Step data
  basicInfo: BasicInfoData;
  trainingInfo: TrainingInfoData;
  nutritionInfo: NutritionInfoData;
  medicalInfo: MedicalInfoData;

  // Status tracking
  currentStep: 1 | 2 | 3 | 4;
  completedSteps: number[];

  // Actions
  setBasicInfo: (data: Partial<BasicInfoData>) => void;
  setTrainingInfo: (data: Partial<TrainingInfoData>) => void;
  setNutritionInfo: (data: Partial<NutritionInfoData>) => void;
  setMedicalInfo: (data: Partial<MedicalInfoData>) => void;
  setCurrentStep: (step: 1 | 2 | 3 | 4) => void;
  markStepComplete: (step: number) => void;
  resetStore: () => void;
}

// Default/initial values
const initialState = {
  basicInfo: {
    firstName: "",
    lastName: "",
    weight: 0,
    height: 0,
    age: 0,
    gender: "Male" as const,
  },
  trainingInfo: {
    trainingGoal: "",
    exerciseIntensity: "Moderate" as const,
    tdee: 0,
    favoriteSport: "",
    weeklyTrainingFrequency: 0,
    currentDiet: "",
  },
  nutritionInfo: {
    dailyFoodPortion: "",
    favoriteTypeOfFood: "",
    favoriteDrink: "",
    dailyWaterIntake: 0,
  },
  medicalInfo: {
    medicalConditions: [],
    usesSmartWatch: false,
    smartWatchType: "",
  },
  currentStep: 1 as const,
  completedSteps: [],
};

const useSetupProfile = create<SetupProfileState>((set) => ({
  ...initialState,

  setBasicInfo: (data) =>
    set((state) => ({
      basicInfo: { ...state.basicInfo, ...data },
    })),

  setTrainingInfo: (data) =>
    set((state) => ({
      trainingInfo: { ...state.trainingInfo, ...data },
    })),

  setNutritionInfo: (data) =>
    set((state) => ({
      nutritionInfo: { ...state.nutritionInfo, ...data },
    })),

  setMedicalInfo: (data) =>
    set((state) => ({
      medicalInfo: { ...state.medicalInfo, ...data },
    })),

  setCurrentStep: (step) => set({ currentStep: step }),

  markStepComplete: (step) =>
    set((state) => ({
      completedSteps: state.completedSteps.includes(step)
        ? state.completedSteps
        : [...state.completedSteps, step],
    })),

  resetStore: () => set(initialState),
}));

export default useSetupProfile;
