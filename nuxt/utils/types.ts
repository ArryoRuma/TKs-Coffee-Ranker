export type Visibility = "PUBLIC" | "PRIVATE" | "FRIENDS";

export type AppUser = {
  id: string;
  handle: string;
  name: string;
  bio: string;
  homeCity: string;
  favoriteDrink: string;
};

export type CoffeeEntry = {
  id: string;
  userId: string;
  title: string;
  drinkType: string;
  cafe: string;
  roaster: string;
  origin: string;
  roastLevel: string;
  brewMethod: string;
  tastingNotes: string[];
  rating: number;
  reviewBody: string;
  dateConsumed: string;
  location: string;
  imagePlaceholder: string;
  wouldOrderAgain: boolean;
  favorite: boolean;
  visibility: Visibility;
};

export type WantToTryItem = {
  id: string;
  cafe: string;
  drink: string;
  city: string;
};

export type List = {
  id: string;
  userId: string;
  title: string;
  description: string;
  isPublic: boolean;
  entryIds: string[];
};
