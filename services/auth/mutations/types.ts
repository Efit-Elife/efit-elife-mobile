import {
  BasicInfoData,
  MedicalInfoData,
  NutritionInfoData,
  TrainingInfoData,
} from "@/features/auth/setup-profile/store/useSetupProfile";
import { StartSSOFlowParams, StartSSOFlowReturnType } from "@clerk/clerk-expo";

export interface ISocialLoginMutation {
  strategy: "oauth_facebook" | "oauth_google" | "oauth_apple";
  startSSOFlow: (
    startSSOFlowParams: StartSSOFlowParams
  ) => Promise<StartSSOFlowReturnType>;
}

export interface ISetupProfileMutation {
  data: BasicInfoData & TrainingInfoData & NutritionInfoData & MedicalInfoData;
}
