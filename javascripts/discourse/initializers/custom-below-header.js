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
          const component = document.querySelector(".custom-below-header");

          if (settings.enable_banner && component) {
            const shouldDisplay = allowedRoutes.split("|").some((route) => {
              if (route.endsWith("*")) {
                return currentPath.startsWith(route.slice(0, -1));
              }
              return currentPath === route;
            });

            component.style.display = shouldDisplay ? "flex" : "none";
            addEventHandler(component);
            
          } else if (component) {
              component.style.display = "none";
          }
        } catch (error) {
          console.error("Error in custom-below-header:", error);
        }
      });
    });
  },
};

function addEventHandler(component) {
  const bannerLink = component.querySelector("a"); 

  if (bannerLink) {
    bannerLink.addEventListener("click", (event) => {
      event.preventDefault(); 

      const placementID = settings.placement_id; 
      const campaignID = settings.campaign_id; 

      if (!placementID || !campaignID) {
        console.warn("Missing placementID or campaignID on banner click.");
        return;
      }

      handleBannerClick({ placementID, campaignID }, event);
    });
  }
}

function handleBannerClick(block, event) {
  const apiEndpoint = settings.api_endpoint;

  if (!apiEndpoint) {
    console.warn("API endpoint is not configured.");
    return;
  }

  const payload = {
    placementID: block.placementID,
    campaignID: block.campaignID,
  };

  ajax(apiEndpoint, {
    method: "POST",
    data: payload,
    headers: {
      "Content-Type": "application/json",
      referrer: document.referrer,
    },
  })
    .then((response) => {
      console.log("Block data sent successfully:", response);
      window.location.href = event.target.href;
    })
    .catch((error) => {
      console.error("Error sending block data:", error);
    });
}