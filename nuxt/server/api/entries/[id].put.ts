import { coffeeEntrySchema } from "~/utils/validation";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const result = coffeeEntrySchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.issues[0]?.message ?? "Validation failed",
    });
  }

  // TODO: persist to Supabase
  return { id, ...result.data };
});
