export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.drink?.trim() || !body.cafe?.trim()) {
    throw createError({ statusCode: 400, statusMessage: "Drink and cafe are required" });
  }

  // TODO: persist to Supabase
  return {
    id: `w${Date.now()}`,
    drink: body.drink,
    cafe: body.cafe,
    city: body.city ?? "",
  };
});
