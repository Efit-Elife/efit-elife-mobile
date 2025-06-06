import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { CircleIcon } from "@/components/ui/icon";

type FocusAreaProps = {
  tag: string;
};

const FocusArea = ({ tag }: FocusAreaProps) => {
  return (
    <Badge
      size="lg"
      variant="solid"
      className="bg-[#4E71FF] rounded-xl p-3 min-w-32"
    >
      <BadgeIcon as={CircleIcon} />
      <BadgeText className="text-white pl-2">{tag}</BadgeText>
    </Badge>
  );
};

export default FocusArea;
