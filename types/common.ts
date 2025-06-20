export type Exercise = {
  id: string;
  name: string;
  difficulty: string;
  description?: string;
  isPremium: boolean;
  imageUrl?: string;
  instruction: string;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
};
export type RouteCoords = {
  latitude: number;
  longitude: number;
};

export interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

export type RouteItem = {
  id: string;
  route: RouteCoords[];
  routeName: string;
  userId: string;
  createdAt: FirestoreTimestamp;
};
