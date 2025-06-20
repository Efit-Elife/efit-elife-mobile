import { useMutation } from "@tanstack/react-query";
import { saveRouteToFirestore } from "../apis";
import { RouteCoords } from "@/types/common";

type CreateRouteParams = {
  currentRoute: RouteCoords[];
  userId?: string;
  routeName: string;
};

export const useSaveRouteMutation = () => {
  return useMutation({
    mutationFn: ({
      currentRoute,
      userId = "unknown",
      routeName,
    }: CreateRouteParams) =>
      saveRouteToFirestore(currentRoute, userId, routeName),
    onError: (error) => {
      console.error("Error saving route:", error);
    },
    onSuccess: () => {
      console.log("Route saved successfully");
    },
  });
};
