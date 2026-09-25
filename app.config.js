require('dotenv').config();

module.exports = ({config}) => ({
  ...config,
  android: {
    ...config.android,
    config: {
      googleMaps: {apiKey: process.env.ENV_GOOGLEMAPS_APIKEY},
    },
  },
});
