export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");
  // TODO: delete from Supabase
  return { deleted: true, id };
});
