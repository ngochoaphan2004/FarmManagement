export type Game = {
  id: number;
  cards: Card[];
};

export type Card = {
  id?: number;
  word: string;
  definition: string;
  filePath: string
  show: boolean;
};

export type CardSwipeDirection = "left" | "right";
export type IsDragOffBoundary = "left" | "right" | null;
