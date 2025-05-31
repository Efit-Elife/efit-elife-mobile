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
