const NodeGeocoder = require("node-geocoder");

const options = {
  provider: process.env.API_KEY_PROVIDER,

  // Optional depending on the providers
  httpAdapter: "http",
  apiKey: process.env.API_KEY, // for Mapquest, OpenCage, APlace, Google Premier
  formatter: null, // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
