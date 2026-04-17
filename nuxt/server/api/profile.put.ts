export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // TODO: persist to Supabase
  return { updated: true, ...body };
});
