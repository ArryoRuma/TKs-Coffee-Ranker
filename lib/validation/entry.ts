import { z } from "zod";

export const ROAST_LEVELS = ["Light", "Light-Medium", "Medium", "Medium-Dark", "Dark"] as const;
export const BREW_METHODS = ["Espresso", "V60", "Chemex", "AeroPress", "French Press", "Cold Brew", "Siphon", "Moka Pot", "Other"] as const;

export const coffeeEntrySchema = z.object({
  title: z.string().min(2, "Title is too short"),
  drinkType: z.string().min(2, "Drink type is required"),
  cafe: z.string().min(2, "Cafe is required"),
  roaster: z.string().min(2, "Roaster is required"),
  rating: z.number().min(1).max(10),
  reviewBody: z.string().min(10, "Tell us a bit more in your review"),
  dateConsumed: z.string().min(4, "Date consumed is required"),
  wouldOrderAgain: z.boolean(),
  visibility: z.enum(["PUBLIC", "PRIVATE", "FRIENDS"]),
  origin: z.string().optional(),
  roastLevel: z.enum(ROAST_LEVELS).optional(),
  brewMethod: z.enum(BREW_METHODS).optional(),
  tastingNotes: z.array(z.string()).optional(),
});

export type CoffeeEntryInput = z.infer<typeof coffeeEntrySchema>;
