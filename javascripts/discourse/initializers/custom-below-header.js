import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "custom-below-header",
  initialize() {
    withPluginApi("0.8", (api) => {
      const settings = Discourse.SiteSettings;

      api.onPageChange(() => {
        try {
          const allowedRoutes = typeof settings.display_on_routes === "string"
            ? settings.display_on_routes.split("|")
            : [];
          const currentPath = window.location.pathname;

          const shouldDisplay = allowedRoutes.some((route) => {
            if (route.endsWith("*")) {
              return currentPath.startsWith(route.slice(0, -1));
            }
            return currentPath === route;
          });

          const component = document.querySelector(".custom-below-header");
          if (component) {
            component.style.display = shouldDisplay ? "" : "none";
          }
        } catch (error) {
          console.error("Error in custom-below-header:", error);
        }
      });
    });
  },
};