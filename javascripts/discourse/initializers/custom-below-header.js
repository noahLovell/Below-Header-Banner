import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "custom-below-header",
  initialize() {
    withPluginApi("0.8", (api) => {
      const settings = Discourse.SiteSettings; // Access theme settings

      api.onPageChange(() => {
        const allowedRoutes = settings.display_on_routes.split("|"); // Get the routes from the setting
        const currentPath = window.location.pathname; // Current route path
        
        const shouldDisplay = allowedRoutes.some((route) => {
          if (route.endsWith("*")) {
            // Match prefix with wildcard
            return currentPath.startsWith(route.slice(0, -1));
          }
          // Match exact path
          return currentPath === route;
        });

        // Show or hide the component based on route match
        const component = document.querySelector(".custom-below-header");
        if (component) {
          component.style.display = shouldDisplay ? "" : "none";
        }
      });
    });
  },
};
