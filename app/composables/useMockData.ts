import type { AppUser, CoffeeEntry, WantToTryItem, List } from "~/utils/types";

export const demoUserId = "u1";

export const users: AppUser[] = [
  {
    id: "u1",
    handle: "@tkruma",
    name: "TK Ruma",
    bio: "Tracking every sip from cozy flat whites to bright, nuanced pour-overs.",
    homeCity: "Jakarta",
    favoriteDrink: "Honey Oat Latte",
  },
  {
    id: "u2",
    handle: "@aria.beans",
    name: "Aria Putri",
    bio: "Weekend cafe hunter, daily espresso realist, always logging notes.",
    homeCity: "Bandung",
    favoriteDrink: "Kenyan V60",
  },
];

export const coffeeEntries: CoffeeEntry[] = [
  {
    id: "e1",
    userId: "u1",
    title: "Honey Oat Flat White",
    drinkType: "Flat White",
    cafe: "Morning Chapter",
    roaster: "Common Grounds",
    origin: "Ethiopia Yirgacheffe",
    roastLevel: "Light-Medium",
    brewMethod: "Espresso",
    tastingNotes: ["honey", "orange blossom", "silky"],
    rating: 9,
    reviewBody:
      "Balanced sweetness and bright citrus. Oat texture stayed creamy without muting acidity. A top-tier sip.",
    dateConsumed: "2026-04-13",
    location: "Jakarta",
    imagePlaceholder: "/coffee-placeholder-1.svg",
    wouldOrderAgain: true,
    favorite: true,
    visibility: "PUBLIC",
  },
  {
    id: "e2",
    userId: "u1",
    title: "Blueberry Filter",
    drinkType: "Pour Over",
    cafe: "Dua Coffee",
    roaster: "Space Roastery",
    origin: "Colombia Huila",
    roastLevel: "Light",
    brewMethod: "V60",
    tastingNotes: ["blueberry", "cane sugar", "tea-like"],
    rating: 8,
    reviewBody:
      "Clean cup with a juicy finish. A tiny bit under-extracted, but still very aromatic and memorable.",
    dateConsumed: "2026-04-08",
    location: "Jakarta",
    imagePlaceholder: "/coffee-placeholder-2.svg",
    wouldOrderAgain: true,
    favorite: false,
    visibility: "FRIENDS",
  },
  {
    id: "e3",
    userId: "u2",
    title: "Rainy Day Cappuccino",
    drinkType: "Cappuccino",
    cafe: "Two Hands Club",
    roaster: "Toko Kopi Press",
    origin: "Flores Bajawa",
    roastLevel: "Medium",
    brewMethod: "Espresso",
    tastingNotes: ["cocoa", "hazelnut", "toffee"],
    rating: 7,
    reviewBody: "Comforting, cozy, and sweet. Great milk texture, slightly bitter finish.",
    dateConsumed: "2026-04-05",
    location: "Bandung",
    imagePlaceholder: "/coffee-placeholder-3.svg",
    wouldOrderAgain: true,
    favorite: false,
    visibility: "PUBLIC",
  },
];

export const wantToTry: WantToTryItem[] = [
  { id: "w1", cafe: "Anomali Coffee", drink: "Natural Ethiopian Espresso", city: "Jakarta" },
  { id: "w2", cafe: "Klasik Beans", drink: "Panama Geisha V60", city: "Bandung" },
  { id: "w3", cafe: "Piknik Kopi", drink: "Cascara Tonic", city: "Yogyakarta" },
];

export const lists: List[] = [
  {
    id: "l1",
    userId: "u1",
    title: "Best of Jakarta 2026",
    description: "Top coffee spots I've visited in Jakarta this year.",
    isPublic: true,
    entryIds: ["e1", "e2"],
  },
  {
    id: "l2",
    userId: "u1",
    title: "Light Roast Favourites",
    description: "All the bright, fruity, and floral cups worth revisiting.",
    isPublic: false,
    entryIds: ["e1"],
  },
];

export function useMockData() {
  const demoUser = users.find((u) => u.id === demoUserId)!;
  const userEntries = coffeeEntries.filter((e) => e.userId === demoUserId);

  return {
    demoUserId,
    demoUser,
    users,
    coffeeEntries,
    userEntries,
    wantToTry,
    lists: lists.filter((l) => l.userId === demoUserId),
  };
}
