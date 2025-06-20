import { queryOptions } from "@tanstack/react-query";
import { RouteQueryKey } from "./key";
import { getRoutesByUserId } from "../apis";

export const getRoutesByUserIdQuery = (userId: string) => {
  return queryOptions({
    queryKey: [RouteQueryKey.GetRouteQuery, userId],
    queryFn: async () => {
      const routes = (await getRoutesByUserId(userId)).sort(
        (a, b) => b.createdAt.seconds - a.createdAt.seconds
      );
      return routes;
    },
  });
};
