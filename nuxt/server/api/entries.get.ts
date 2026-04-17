const demoEntries = [
  {
    id: "entry-1",
    name: "Honey Oat Flat White",
    cafe: "Morning Chapter",
    score: 9,
    notes: "Brown sugar sweetness and silky body.",
  },
  {
    id: "entry-2",
    name: "Kenyan V60",
    cafe: "Third Wave House",
    score: 8,
    notes: "Citrus-forward cup with bright acidity.",
  },
  {
    id: "entry-3",
    name: "Iced Latte",
    cafe: "Seaside Roasters",
    score: 7,
    notes: "Chocolate finish, mellow and refreshing.",
  },
];

export default defineEventHandler(() => {
  const config = useRuntimeConfig();

  if (!config.public?.demoMode) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
    });
  }

  return demoEntries;
});
