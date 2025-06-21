import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveRouteToFirestore, editRouteName, deleteRoute } from "../apis";
import { RouteCoords } from "@/types/common";
import { RouteQueryKey } from "../queries/key";

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

export const useEditNameMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      newName,
      routeId,
    }: {
      newName: string;
      routeId: string;
    }) => {
      const result = await editRouteName(routeId, newName);
      if (!result) {
        throw new Error("Failed to edit route name");
      }
      return result;
    },
    onError: (error) => {
      console.error("Error editing route name:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [RouteQueryKey.GetRouteQuery, userId],
      });
      console.log("Route name edited successfully and cache invalidated.");
    },
  });
};

export const useDeleteRouteMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (routeId: string) => {
      const result = await deleteRoute(routeId);
      if (!result) {
        throw new Error("Failed to delete route");
      }
      return result;
    },
    onError: (error) => {
      console.error("Error deleting route:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [RouteQueryKey.GetRouteQuery, userId],
      });
      console.log("Route deleted successfully and cache invalidated.");
    },
  });
};
