import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
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

export const editRouteName = async (
  routeId: string,
  newName: string
): Promise<boolean> => {
  try {
    const routeDocRef = doc(firebaseFirestore, "tracking-routes", routeId);
    await updateDoc(routeDocRef, {
      routeName: newName,
    });
    return true;
  } catch (error) {
    console.error("Failed to update route name:", error);
    return false;
  }
};

export const deleteRoute = async (routeId: string): Promise<boolean> => {
  try {
    const routeDocRef = doc(firebaseFirestore, "tracking-routes", routeId);
    await deleteDoc(routeDocRef);
    return true;
  } catch (error) {
    console.error("Failed to delete route:", error);
    return false;
  }
};
