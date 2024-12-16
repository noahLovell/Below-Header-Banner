import { registerHelper } from "discourse-common/lib/helpers";

registerHelper("route-prefix-match", function (routes) {
    const currentPath = DiscourseURL.current();
    if (!routes || !currentPath) {
      return false;
    }
  
    // Ensure routes is split into an array
    const routeList = routes.split("|").map(route => route.trim());
  
    // Normalize currentPath to remove query params or fragments
    const normalizedPath = currentPath.split("?")[0].split("#")[0];
  
    // Check if currentPath starts with any of the route prefixes
    return routeList.some(route => normalizedPath.startsWith(route));
  });
  
