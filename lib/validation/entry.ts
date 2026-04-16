import { z } from "zod";

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
});

export type CoffeeEntryInput = z.infer<typeof coffeeEntrySchema>;
