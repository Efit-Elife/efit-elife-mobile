import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export const AuthLayout = (props: AuthLayoutProps) => {
  return (
    <SafeAreaView className="w-full h-full">
      <ScrollView
        className="w-full h-full"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {props.children}
      </ScrollView>
    </SafeAreaView>
  );
};
