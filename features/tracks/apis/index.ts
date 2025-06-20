import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { firebaseFirestore } from "@/config/firebase";
import { RouteCoords, RouteItem } from "@/types/common";

export const saveRouteToFirestore = async (
  routeCoords: RouteCoords[],
  userId: string = "unknown",
  routeName: string
): Promise<boolean> => {
  if (!routeCoords || routeCoords.length < 2) {
    return false;
  }
  try {
    await addDoc(collection(firebaseFirestore, "tracking-routes"), {
      createdAt: Timestamp.now(),
      userId: userId,
      route: routeCoords,
      routeName,
    });
    return true;
  } catch (err) {
    return false;
  }
};

export const getRoutesByUserId = async (
  userId: string
): Promise<RouteItem[]> => {
  const routesCollection = collection(firebaseFirestore, "tracking-routes");
  const querySnapshot = await getDocs(
    query(routesCollection, where("userId", "==", userId))
  );

  const routes = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<RouteItem, "id">),
  }));

  return routes;
};
