document.addEventListener("DOMContentLoaded", () => {
  const map = new maplibregl.Map({
    container: "map", // container id
    style: "https://demotiles.maplibre.org/style.json", // style URL
    center: [-122.084614, 37.4217636], // starting position [lng, lat]
    zoom: 3, // starting zoom
  });
  // Optional: Add navigation controls
  map.addControl(new maplibregl.NavigationControl());

  async function loadMap(stores) {
    // On load
    map.on("load", async () => {
      // Add iamge
      map.loadImage("/images/simple-marker.png", (error, image) => {
        if (error) throw error;
        console.log("image load successfully");
        map.addImage("simple-marker", image);
      });
      map.addLayer({
        id: "points",
        type: "symbol",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: stores,
          },
        },
        layout: {
          "icon-image": "simple-marker",
          "icon-size": 0.6,
          "text-field": ["get", "storeId"],
          "text-font": ["Noto Sans Regular"],
          "text-size": 12,
          "text-offset": [0, 0.8],
          "text-anchor": "top",
        },
      });
    });
  }

  async function getStores() {
    const response = await fetch("/api/geo/store");
    const data = await response.json();
    const stores = data.data.map((store) => {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            store.location.coordinates[0],
            store.location.coordinates[1],
          ],
        },
        properties: {
          storeId: store.storeId,
        },
      };
    });

    loadMap(stores);
  }

  getStores();
});
