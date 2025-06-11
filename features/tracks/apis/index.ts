import { addDoc, collection, Timestamp } from "firebase/firestore";
import { firebaseFirestore } from "@/config/firebase";

export type RouteCoords = {
  latitude: number;
  longitude: number;
};
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
    console.log("✅ Route saved to Firestore successfully");
    return true;
  } catch (err) {
    console.error("❌ Failed to save route to Firestore:", err);
    return false;
  }
};

export const getRoutesByUserId = async (userId: string) => {};
