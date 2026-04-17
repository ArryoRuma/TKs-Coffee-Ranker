export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.title?.trim()) {
    throw createError({ statusCode: 400, statusMessage: "Title is required" });
  }

  // TODO: persist to Supabase
  return {
    id: `l${Date.now()}`,
    title: body.title,
    description: body.description ?? "",
    isPublic: body.isPublic ?? true,
    entryIds: [],
  };
});
