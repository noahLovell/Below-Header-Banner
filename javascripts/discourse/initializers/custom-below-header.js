import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "custom-below-header",
  initialize(container) {
    withPluginApi("0.8", (api) => {
      this.siteSettings = container.lookup("service:site-settings");

      api.onPageChange(() => {
        try {
          const allowedRoutes = settings.display_on_routes
          const currentPath = window.location.pathname;

          if (settings.enable_banner) {
            const shouldDisplay = allowedRoutes.split("|").some((route) => {
              if (route.endsWith("*")) {
                return currentPath.startsWith(route.slice(0, -1));
              }
              return currentPath === route;
            });

            const component = document.querySelector(".custom-below-header");
            if (component) {
              component.style.display = shouldDisplay ? "flex" : "none";
            }

            console.log({
              settings: this.siteSettings,
              component: component,
              shouldDisplay: shouldDisplay,
              currentPath: currentPath,
              allowedRoutes: allowedRoutes,
            })
          } else {
            const component = document.querySelector(".custom-below-header");
            if (component) {
              component.style.display = "none";
            }
          }
        } catch (error) {
          console.error("Error in custom-below-header:", error);
        }
      });
    });
  },
};