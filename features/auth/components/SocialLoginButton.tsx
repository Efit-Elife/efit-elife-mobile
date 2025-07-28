import { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSSO } from "@clerk/clerk-expo";
import { Button, ButtonText } from "@/components/ui/button";
import { useSocicalLoginMutation } from "@/services/auth/mutations";
import { Spinner } from "@/components/ui/spinner";
import useCustomToast from "@/hooks/useCustomToast";

const SocialLoginButton = ({
  strategy,
}: {
  strategy: "facebook" | "google" | "apple";
}) => {
  const { toastSuccess, toastError } = useCustomToast();
  const { mutate: socicalLogin, isPending } = useSocicalLoginMutation();
  const getStrategy = () => {
    if (strategy === "facebook") {
      return "oauth_facebook";
    } else if (strategy === "google") {
      return "oauth_google";
    } else if (strategy === "apple") {
      return "oauth_apple";
    }
    return "oauth_facebook";
  };

  const { startSSOFlow } = useSSO();

  const buttonText = useMemo(() => {
    if (isPending) {
      return "Loading...";
    }

    if (strategy === "facebook") {
      return "Continue with Facebook";
    } else if (strategy === "google") {
      return "Continue with Google";
    } else if (strategy === "apple") {
      return "Continue with Apple";
    }
  }, [isPending, strategy]);

  const buttonIcon = useMemo(() => {
    if (strategy === "facebook") {
      return <Ionicons name="logo-facebook" size={24} color="#1977F3" />;
    } else if (strategy === "google") {
      return <Ionicons name="logo-google" size={24} color="#DB4437" />;
    } else if (strategy === "apple") {
      return <Ionicons name="logo-apple" size={24} color="black" />;
    }
  }, [strategy]);

  const handleSocialLogin = () => {
    socicalLogin(
      {
        strategy: getStrategy(),
        startSSOFlow,
      },
      {
        onSuccess: () => {
          toastSuccess("Successfully logged in with " + strategy);
        },
        onError: (error) => {
          console.error("Social login error:", error);
          toastError("Failed to log in with " + strategy);
        },
      }
    );
  };

  return (
    <Button
      variant="outline"
      className="w-full gap-1"
      disabled={isPending}
      onPress={handleSocialLogin}
    >
      <ButtonText className="font-medium">{buttonText}</ButtonText>
      {isPending ? <Spinner size="small" /> : buttonIcon}
    </Button>
  );
};

export default SocialLoginButton;
