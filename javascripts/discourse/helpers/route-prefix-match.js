import { registerHelper } from "discourse-common/lib/helpers";

registerHelper("route-prefix-match", function (routes, currentPath) {
  if (!routes || !currentPath) {
    return false;
  }
  // Convert the routes into a usable array if it's a string
  const routeList = Array.isArray(routes) ? routes : routes.split(",");
  // Check if the current path starts with any of the prefixes
  return routeList.some((route) => currentPath.startsWith(route));
});
