// Router reminder: Hash routing keeps every screen addressable inside one static HTML prototype without external services.
export const publicRoutes = ["landing", "login", "onboarding"];
export function getRoute() { return (location.hash.replace("#/", "") || "landing").split("?")[0]; }
export function go(route) { location.hash = `#/${route}`; }
export function isPublicRoute(route) { return publicRoutes.includes(route); }
