export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth();

  const publicPaths = ["/", "/auth/sign-in"];
  if (publicPaths.includes(to.path)) return;

  if (!isAuthenticated.value) {
    return navigateTo("/auth/sign-in");
  }
});
