import { useMutation } from "@tanstack/react-query";
import * as Linking from "expo-linking";
import { ISetupProfileMutation, ISocialLoginMutation } from "./types";
import { useUser } from "@clerk/clerk-expo";

export const useSocicalLoginMutation = () => {
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({ strategy, startSSOFlow }: ISocialLoginMutation) => {
      const { setActive, createdSessionId } = await startSSOFlow({
        strategy: strategy,
        redirectUrl: Linking.createURL("/", {
          scheme: "efitelifemobile",
        }),
      });

      if (createdSessionId) {
        console.log("Session created", createdSessionId);
        setActive!({ session: createdSessionId });

        await user?.reload();
      }
    },
  });
};

export const useSetupProfileMutation = () => {
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({ data }: ISetupProfileMutation) => {
      const { firstName, lastName, ...rest } = data;
      await user?.update({
        firstName,
        lastName,
        unsafeMetadata: {
          ...rest,
          onboarding_completed: true,
        },
      });

      await user?.reload();
    },
  });
};
